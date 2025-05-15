import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db } from './db';
import { v4 as uuidv4 } from 'uuid';

// Configure storage for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for multer
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create multer upload instance
const upload = multer({ 
  storage: diskStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Helper functions for database operations
export const storage = {
  upload,
  uploadDir,
  
  // File operations
  getFilePath: (filename: string) => path.join(uploadDir, filename),
  removeFile: (filename: string) => {
    const filepath = path.join(uploadDir, filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  },
  
  // User operations
  async createUser(userData: any) {
    const id = uuidv4();
    const now = new Date();
    const user = { id, ...userData, createdAt: now, updatedAt: now };
    
    await db.run(
      'INSERT INTO users (id, username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.id, user.username, user.email, user.password, user.role, user.createdAt.toISOString(), user.updatedAt.toISOString()]
    );
    
    return user;
  },
  
  async getUserByUsername(username: string) {
    return db.get('SELECT * FROM users WHERE username = ?', [username]);
  },
  
  async getUserByEmail(email: string) {
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  },
  
  async getUserById(id: string) {
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  },
  
  async getAllUsers() {
    return db.all('SELECT id, username, email, fullName, role, createdAt, updatedAt FROM users');
  },
  
  async getUser(id: string) {
    return this.getUserById(id);
  },
  
  async updateUserStatus(id: string, isActive: boolean) {
    const now = new Date();
    await db.run('UPDATE users SET isActive = ?, updatedAt = ? WHERE id = ?', 
      [isActive ? 1 : 0, now.toISOString(), id]);
    return { id, isActive };
  },
  
  async updateUserType(id: string, role: string) {
    const now = new Date();
    await db.run('UPDATE users SET role = ?, updatedAt = ? WHERE id = ?', 
      [role, now.toISOString(), id]);
    return { id, role };
  },
  
  async getCourse(id: string) {
    return db.get('SELECT * FROM courses WHERE id = ?', [id]);
  },
  
  async updateCourseProgress(userId: string, courseId: string, progress: number) {
    const now = new Date();
    const existingProgress = await db.get(
      'SELECT * FROM user_course_progress WHERE userId = ? AND courseId = ?', 
      [userId, courseId]
    );
    
    if (existingProgress) {
      await db.run(
        'UPDATE user_course_progress SET progress = ?, updatedAt = ? WHERE userId = ? AND courseId = ?',
        [progress, now.toISOString(), userId, courseId]
      );
    } else {
      await db.run(
        'INSERT INTO user_course_progress (userId, courseId, progress, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [userId, courseId, progress, now.toISOString(), now.toISOString()]
      );
    }
    
    return { userId, courseId, progress };
  },
  
  // Booking operations
  async createBooking(bookingData: any) {
    const id = uuidv4();
    const now = new Date();
    const booking = { id, ...bookingData, createdAt: now };
    
    await db.run(
      'INSERT INTO bookings (id, userId, name, email, phone, date, time, guests, specialRequests, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [booking.id, booking.userId, booking.name, booking.email, booking.phone, booking.date, booking.time, booking.guests, booking.specialRequests, booking.status, booking.createdAt.toISOString()]
    );
    
    return booking;
  },
  
  async getBookings() {
    return db.all('SELECT * FROM bookings ORDER BY date DESC');
  },
  
  async getBookingsByUserId(userId: string) {
    return db.all('SELECT * FROM bookings WHERE userId = ? ORDER BY date DESC', [userId]);
  },
  
  // Contact operations
  async createContact(contactData: any) {
    const id = uuidv4();
    const now = new Date();
    const contact = { id, ...contactData, createdAt: now };
    
    await db.run(
      'INSERT INTO contacts (id, name, email, phone, message, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [contact.id, contact.name, contact.email, contact.phone || null, contact.message, contact.createdAt.toISOString()]
    );
    
    return contact;
  },
  
  // Enrollment operations
  async createEnrollment(enrollmentData: any) {
    const id = uuidv4();
    const now = new Date();
    const enrollment = { id, ...enrollmentData, createdAt: now };
    
    await db.run(
      'INSERT INTO enrollments (id, userId, courseId, name, email, phone, paymentStatus, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [enrollment.id, enrollment.userId, enrollment.courseId, enrollment.name, enrollment.email, enrollment.phone, enrollment.paymentStatus, enrollment.createdAt.toISOString()]
    );
    
    return enrollment;
  },
  
  // Freelancer operations
  async createFreelancer(freelancerData: any) {
    const id = uuidv4();
    const now = new Date();
    const freelancer = { id, ...freelancerData, createdAt: now };
    
    await db.run(
      'INSERT INTO freelancers (id, name, email, phone, experience, skills, resume, coverLetter, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [freelancer.id, freelancer.name, freelancer.email, freelancer.phone, freelancer.experience, JSON.stringify(freelancer.skills), freelancer.resume, freelancer.coverLetter, freelancer.createdAt.toISOString()]
    );
    
    return freelancer;
  },
  
  // Newsletter operations
  async createSubscriber(subscriberData: any) {
    const id = uuidv4();
    const now = new Date();
    const subscriber = { id, ...subscriberData, isActive: true, createdAt: now };
    
    await db.run(
      'INSERT INTO subscribers (id, email, isActive, subscriptionDate, createdAt) VALUES (?, ?, ?, ?, ?)',
      [subscriber.id, subscriber.email, subscriber.isActive ? 1 : 0, now.toISOString(), subscriber.createdAt.toISOString()]
    );
    
    return subscriber;
  },
  
  async getSubscriberByEmail(email: string) {
    return db.get('SELECT * FROM subscribers WHERE email = ?', [email]);
  },
  
  async updateSubscriberStatus(id: string, isActive: boolean) {
    await db.run('UPDATE subscribers SET isActive = ? WHERE id = ?', [isActive ? 1 : 0, id]);
    return { id, isActive };
  }
};
