import express from "express";
import cors from "cors";
import departmentsRouter from "./routes/departments";
import subjectsRouter from "./routes/subjects";

const app = express();
const PORT = 8000;

const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl) {
  console.warn("FRONTEND_URL is not set; defaulting to http://localhost:5173");
}
const corsOrigin = frontendUrl ?? "http://localhost:5173";

app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/subjects", subjectsRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Admin backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
