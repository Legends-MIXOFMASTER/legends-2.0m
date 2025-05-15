import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { 
  insertBookingSchema, 
  insertContactSchema, 
  insertEnrollmentSchema, 
  insertFreelancerSchema, 
  insertSubscriberSchema,
  insertUserSchema,
  User,
  Booking,
  Contact,
  Enrollment,
  Freelancer,
  Subscriber,
  Course
} from "./shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

// Import enhanced authentication middleware
import { authenticate, generateToken, refreshToken } from "./middleware/auth";
import { authorize } from "./middleware/authorize";

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'houseoflegends-secret-key';

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

// Create multer upload instance
const upload = multer({
  storage: storage_config,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!') as any, false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // User registration endpoint
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const { password, ...userData } = req.body;

      // Check if user with the same username or email already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username) as User | null;
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const existingUserByEmail = await storage.getUserByEmail(userData.email) as User | null;
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user data object
      const userDataWithPassword = {
        ...userData,
        password: hashedPassword,
      } as Record<string, any>;

      // Validate with Zod schema
      const validatedData = insertUserSchema.parse(userDataWithPassword);

      // Create user
      const user = await storage.createUser(validatedData) as User;

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Return success with token
      res.status(201).json({
        message: "User registered successfully",
        userId: user.id,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // User login endpoint
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body as { username: string; password: string };

      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Get user by username
      const user = await storage.getUserByUsername(username) as User | null;
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({ message: "Account is inactive. Please contact support." });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Return success with token
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin middleware
  const isAdmin = (req: any, res: Response, next: Function) => {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Admin: Get all users
  app.get("/api/admin/users", authenticate, authorize(['admin']), async (req, res) => {
    try {
      const users = await storage.getAllUsers() as User[];
      return res.status(200).json({ users: users.map((user: User) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }))
      });
    } catch (error) {
      console.error('Get users error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  // Admin: Update user status
  app.put("/api/admin/users/:id/status", authenticate, authorize(['admin']), async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      // Convert isActive to boolean if needed
      const isActiveBoolean = typeof isActive === 'string' ? isActive === 'true' : Boolean(isActive);
      
      await storage.updateUserStatus(id, isActiveBoolean);
      return res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
      console.error('Update user status error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  // Update course progress
  app.post('/api/courses/:courseId/progress', authenticate, async (req, res) => {
    try {
      const { courseId } = req.params;
      const { progress } = req.body;
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      const progressNumber = typeof progress === 'string' ? parseInt(progress, 10) : progress;
      
      await storage.updateCourseProgress(userId, courseId, progressNumber);
      return res.status(200).json({ message: 'Course progress updated', progress: progressNumber });
    } catch (error) {
      console.error('Update course progress error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  // Get course details
  app.get('/api/courses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const course = await storage.getCourse(id) as Course | null;
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      return res.status(200).json({ course });
    } catch (error) {
      console.error('Get course error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  app.post("/api/courses/:id/progress", authenticate, async (req: any, res: Response) => {
    try {
      const { moduleId } = req.body;
      const userId = req.user?.id;
      const courseId = req.params.id;
      
      if (!userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Convert moduleId to number if it's a string
      const progressNumber = typeof moduleId === 'string' ? parseInt(moduleId, 10) : moduleId;
      
      const progress = await storage.updateCourseProgress(userId, courseId, progressNumber);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin: Update user type
  app.put("/api/admin/users/:id/type", authenticate, authorize(['admin']), async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { userType } = req.body;

      if (!['user', 'admin', 'bartender'].includes(userType)) {
        return res.status(400).json({ message: "Invalid user type" });
      }

      await storage.updateUserType(userId, userType);
      res.status(200).json({ message: "User type updated successfully" });
    } catch (error) {
      console.error("Update user type error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get current user endpoint
  app.get("/api/me", authenticate, async (req: any, res: Response) => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Get user from database
      const user = await storage.getUser(userId) as User | null;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user data (excluding password)
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        userType: user.userType,
        experience: user.experience,
        bio: user.bio,
        isActive: user.isActive,
        createdAt: user.createdAt
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Gallery image upload endpoint
  app.post("/api/gallery/upload", authenticate, upload.single('image'), async (req: any, res: Response) => {
    try {
      // Check if user is admin or staff
      if (req.user?.role !== 'admin' && req.user?.role !== 'bartender') {
        // Delete the uploaded file if user is not authorized
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(403).json({ message: "You don't have permission to upload images" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Create gallery image entry
      const imageData = {
        filename: req.file.filename,
        path: req.file.path.replace(/\\/g, '/'), // Normalize path for different OS
        altText: req.body.altText || req.file.originalname,
        category: req.body.category || null,
        uploadedBy: req.user.id
      };

      const galleryImage = await db.addGalleryImage(imageData);

      // Return success
      res.status(201).json({
        message: "Image uploaded successfully",
        image: {
          id: galleryImage.id,
          filename: galleryImage.filename,
          path: galleryImage.path.replace(/^.*\/public/, '/public'), // Convert to URL path
          altText: galleryImage.altText,
          category: galleryImage.category
        }
      });
    } catch (error) {
      console.error("Gallery upload error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get gallery images endpoint
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;

      // Get images from database - use the category if it exists, otherwise get all images
      // We need to provide the exact type that the function expects
      const images = await db.getGalleryImages(category as string);

      // Format image paths for URLs
      const formattedImages = images.map((image: any) => ({
        id: image.id,
        filename: image.filename,
        url: image.path.replace(/^.*\/public/, '/public'), // Convert to URL path
        altText: image.alt_text,
        category: image.category,
        uploadedAt: image.uploaded_at
      }));

      // Return images
      res.status(200).json(formattedImages);
    } catch (error) {
      console.error("Get gallery images error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete gallery image endpoint
  app.delete("/api/gallery/:id", authenticate, async (req: any, res: Response) => {
    try {
      const imageId = parseInt(req.params.id);

      // Check if user is admin or staff
      if (req.user.userType !== 'admin' && req.user.userType !== 'staff') {
        return res.status(403).json({ message: "You don't have permission to delete images" });
      }

      // Delete image
      const result = await db.deleteGalleryImage(imageId);

      if (!result) {
        return res.status(404).json({ message: "Image not found" });
      }

      // Return success
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error("Delete gallery image error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create booking endpoint
  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const { brand, type, ...restData } = req.body;

      // For now, we don't require user authentication, so userId is optional
      const bookingData = {
        ...restData,
        brand: brand || "hol",
        type: type || "event",
      };

      // Validate request body
      const validatedData = insertBookingSchema.parse(bookingData);

      const booking = await storage.createBooking(validatedData);

      res.status(201).json({
        message: "Booking created successfully",
        bookingId: booking.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Create contact endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);

      const contact = await storage.createContact(validatedData);

      res.status(201).json({
        message: "Message sent successfully",
        contactId: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Create enrollment endpoint (training sign up)
  app.post("/api/enrollments", async (req: Request, res: Response) => {
    try {
      // For now, we don't require user authentication, so userId is optional
      const enrollmentData = {
        ...req.body,
        userId: req.body.userId || null,
      };

      // Validate request body
      const validatedData = insertEnrollmentSchema.parse(enrollmentData);

      const enrollment = await storage.createEnrollment(validatedData);

      res.status(201).json({
        message: "Enrollment created successfully",
        enrollmentId: enrollment.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Create freelancer endpoint (bartender registration)
  app.post("/api/freelancers", async (req: Request, res: Response) => {
    try {
      // For now, we don't require user authentication, so userId is optional
      const freelancerData = {
        ...req.body,
        userId: req.body.userId || null,
      };

      // Validate request body
      const validatedData = insertFreelancerSchema.parse(freelancerData);

      const freelancer = await storage.createFreelancer(validatedData);

      res.status(201).json({
        message: "Freelancer registration successful",
        freelancerId: freelancer.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const schema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
      });

      const { email } = schema.parse(req.body);

      // Check if the email is already subscribed
      const existingSubscriber = await storage.getSubscriberByEmail(email) as Subscriber | null;

      if (existingSubscriber) {
        // If subscriber exists but is inactive, reactivate them
        if (!existingSubscriber.isActive) {
          // Ensure id is a string to match the expected parameter type
          const subscriberId = String(existingSubscriber.id);
          await storage.updateSubscriberStatus(subscriberId, true);
          return res.status(200).json({ message: "Subscription reactivated successfully" });
        }

        // If already active, just return success
        return res.status(200).json({ message: "Already subscribed" });
      }

      // Create new subscriber
      const subscriber = await storage.createSubscriber({ email }) as Subscriber;

      res.status(201).json({
        message: "Subscribed successfully",
        subscriberId: subscriber.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}