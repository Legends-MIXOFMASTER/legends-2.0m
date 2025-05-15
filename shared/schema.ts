import { z } from "zod";

// User schema
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]).default("user"),
});

// Contact schema
export const insertContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  createdAt: z.date().default(() => new Date()),
});

// Booking schema
export const insertBookingSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string(),
  date: z.string(),
  time: z.string(),
  guests: z.number().int().min(1).max(20),
  specialRequests: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).default("pending"),
  createdAt: z.date().default(() => new Date()),
});

// Enrollment schema for courses
export const insertEnrollmentSchema = z.object({
  userId: z.string().optional(),
  courseId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string(),
  paymentStatus: z.enum(["pending", "paid", "refunded"]).default("pending"),
  createdAt: z.date().default(() => new Date()),
});

// Freelancer application schema
export const insertFreelancerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string(),
  experience: z.number().int().min(0),
  skills: z.array(z.string()),
  resume: z.string().optional(), // File path or URL
  coverLetter: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Newsletter subscriber schema
export const insertSubscriberSchema = z.object({
  email: z.string().email(),
  subscriptionDate: z.date().default(() => new Date()),
  status: z.enum(["active", "unsubscribed"]).default("active"),
});
