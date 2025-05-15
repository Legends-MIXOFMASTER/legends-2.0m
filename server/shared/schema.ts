import { z } from 'zod';

// Define User schema
export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
  role: z.enum(['user', 'admin', 'bartender']).default('user'),
  userType: z.string().optional(), // For backward compatibility
  phone: z.string().optional(),
  experience: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type User = z.infer<typeof userSchema>;

// Schema for user registration
export const insertUserSchema = userSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Schema for booking
export const bookingSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  date: z.string(),
  time: z.string(),
  guests: z.number().int().positive(),
  specialRequests: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
  createdAt: z.date().optional()
});

export type Booking = z.infer<typeof bookingSchema>;

export const insertBookingSchema = bookingSchema.omit({ 
  id: true, 
  createdAt: true 
});

// Schema for contact form
export const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  createdAt: z.date().optional()
});

export type Contact = z.infer<typeof contactSchema>;

export const insertContactSchema = contactSchema.omit({ 
  id: true, 
  createdAt: true 
});

// Schema for course enrollment
export const enrollmentSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  courseId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  paymentStatus: z.enum(['pending', 'completed', 'failed']).default('pending'),
  createdAt: z.date().optional()
});

export type Enrollment = z.infer<typeof enrollmentSchema>;

export const insertEnrollmentSchema = enrollmentSchema.omit({ 
  id: true, 
  createdAt: true 
});

// Schema for freelancer applications
export const freelancerSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  experience: z.number().int().min(0),
  skills: z.array(z.string()),
  resume: z.string().optional(),
  coverLetter: z.string().optional(),
  createdAt: z.date().optional()
});

export type Freelancer = z.infer<typeof freelancerSchema>;

export const insertFreelancerSchema = freelancerSchema.omit({ 
  id: true, 
  createdAt: true 
});

// Schema for newsletter subscribers
export const subscriberSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  subscriptionDate: z.date().optional(),
  createdAt: z.date().optional()
});

export type Subscriber = z.infer<typeof subscriberSchema>;

export const insertSubscriberSchema = subscriberSchema.pick({ 
  email: true 
});

// Schema for courses
export const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Course = z.infer<typeof courseSchema>;

// Schema for user course progress
export const userCourseProgressSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  progress: z.number().min(0).max(100),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type UserCourseProgress = z.infer<typeof userCourseProgressSchema>;
