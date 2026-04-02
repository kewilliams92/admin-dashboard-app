import * as z from "zod";

export const facultySchema = z.object({
  name: z.string(),
  emails: z.string().email(),
  role: z.enum(["admin", "teacher", "student"]),
  department: z.string(),
  image: z.string().optional(),
  imageCldPubId: z.string().optional(),
});

export const subjectSchema = z.object({
  name: z.string().min(3, "Subject name must be at least 3 characters"),
  code: z.string().min(5, "Subject code must be at least 5 characters"),
  description: z
    .string()
    .min(5, "Subject description must be at least 5 characters"),
  department: z
    .string()
    .min(2, "Subject department must be at least 2 characters"),
});

const scheduleSchema = z.object({
  day: z.string().min(1, "Day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export const classSchema = z.object({
  name: z
    .string({ required_error: "Class name is required" })
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name must be at most 50 characters"),
  description: z.string().optional(),
  subjectId: z.coerce
    .number({
      required_error: "Subject is required",
      invalid_type_error: "Subject is required",
    })
    .min(1, "Subject is required"),
  teacherId: z
    .string({ required_error: "Teacher is required" })
    .min(1, "Teacher is required"),
  capacity: z.coerce
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, "Capacity must be at least 1")
    .optional(),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
    invalid_type_error: "Status is required",
  }),
  bannerUrl: z
    .string({ required_error: "Banner image is required" })
    .min(1, "Banner image is required"),
  bannerCldPubId: z.string().optional(),
  inviteCode: z.string().optional(),
  schedules: z.array(scheduleSchema).optional(),
});

export const enrollmentSchema = z.object({
  classId: z.coerce
    .number({
      required_error: "Class ID is required",
      invalid_type_error: "Class ID is required",
    })
    .min(1, "Class ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
});
