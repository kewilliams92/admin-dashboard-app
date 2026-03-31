import { and, ilike, or, sql, eq, getTableColumns, desc } from "drizzle-orm";
import { departments, subjects } from "../db/schema";
import express from "express";
import { db } from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, +page);
    const limitPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPage;

    const filterConditions = [];

    //if search query exists, we want to filter by subject name or subject code
    if (search) {
      filterConditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`),
        ),
      );
    }

    //If department filter exists, match department id
    if (department) {
      filterConditions.push(ilike(departments.name, `%${departments}%`));
    }

    //combine all filters using AND if any exist
    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;

    const subjectsList = await db
      .select({
        ...getTableColumns(subjects),
        department: { ...getTableColumns(departments) },
      })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause)
      .orderBy(desc(subjects.createdAt))
      .limit(limitPage)
      .offset(offset);

    res.status(200).json({
      data: subjectsList,
      pagination: {
        page: currentPage,
        limit: limitPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPage),
      },
    });
  } catch (e) {
    console.error(`GET /subjects error: ${e}`); //i am 4 spaces
    res.status(500).json({ error: "Failed to get subjects" });
  }
});

export default router;
