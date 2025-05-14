import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Initialize SQLite database
const dbPath = path.resolve('./database.db');
const sqlite = new Database(dbPath);

// Export a function to initialize the database (run migrations, etc.)
export function initializeDatabase() {
  console.log(`Initializing database at ${dbPath}`);
  
  try {
    // Create tables if they don't exist
    
    // Create users table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        user_type TEXT NOT NULL,
        experience TEXT,
        bio TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create bookings table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        brand TEXT NOT NULL,
        type TEXT NOT NULL,
        service TEXT NOT NULL,
        date TEXT NOT NULL,
        guest_count INTEGER,
        venue TEXT,
        details TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create freelancers table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS freelancers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        experience TEXT NOT NULL,
        specialties TEXT,
        availability TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create enrollments table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        program TEXT NOT NULL,
        start_date TEXT NOT NULL,
        goals TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create contacts table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create subscribers table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create gallery_images table for the image gallery
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        path TEXT NOT NULL,
        alt_text TEXT,
        category TEXT,
        uploaded_by INTEGER,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
      )
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Database operations
export const db = {
  // User operations
  getUser: (id: number) => {
    return sqlite.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  
  getUserByUsername: (username: string) => {
    return sqlite.prepare('SELECT * FROM users WHERE username = ?').get(username);
  },
  
  getUserByEmail: (email: string) => {
    return sqlite.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },
  
  createUser: (user: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO users (username, password, email, full_name, phone, user_type, experience, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      user.username,
      user.password,
      user.email,
      user.fullName,
      user.phone || null,
      user.userType,
      user.experience || null,
      user.bio || null
    );
    
    return { id: result.lastInsertRowid, ...user };
  },

  // Booking operations
  getBooking: (id: number) => {
    return sqlite.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
  },
  
  getBookingsByUserId: (userId: number) => {
    return sqlite.prepare('SELECT * FROM bookings WHERE user_id = ?').all(userId);
  },
  
  getBookingsByBrand: (brand: string) => {
    return sqlite.prepare('SELECT * FROM bookings WHERE brand = ?').all(brand);
  },
  
  createBooking: (booking: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO bookings (user_id, brand, type, service, date, guest_count, venue, details, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      booking.userId || null,
      booking.brand,
      booking.type,
      booking.service,
      booking.date,
      booking.guestCount || null,
      booking.venue || null,
      booking.details || null,
      'pending'
    );
    
    return { id: result.lastInsertRowid, ...booking, status: 'pending' };
  },
  
  updateBookingStatus: (id: number, status: string) => {
    const stmt = sqlite.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return db.getBooking(id);
  },

  // Contact operations
  getContact: (id: number) => {
    return sqlite.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  },
  
  getContacts: () => {
    return sqlite.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  },
  
  createContact: (contact: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO contacts (name, email, subject, message, is_read)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      contact.name,
      contact.email,
      contact.subject,
      contact.message,
      0
    );
    
    return { id: result.lastInsertRowid, ...contact, isRead: false };
  },
  
  markContactAsRead: (id: number) => {
    const stmt = sqlite.prepare('UPDATE contacts SET is_read = 1 WHERE id = ?');
    stmt.run(id);
    return db.getContact(id);
  },

  // Subscriber operations
  getSubscriber: (id: number) => {
    return sqlite.prepare('SELECT * FROM subscribers WHERE id = ?').get(id);
  },
  
  getSubscriberByEmail: (email: string) => {
    return sqlite.prepare('SELECT * FROM subscribers WHERE email = ?').get(email);
  },
  
  getSubscribers: () => {
    return sqlite.prepare('SELECT * FROM subscribers').all();
  },
  
  createSubscriber: (subscriber: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO subscribers (email, is_active)
      VALUES (?, ?)
    `);
    
    const result = stmt.run(
      subscriber.email,
      1
    );
    
    return { id: result.lastInsertRowid, ...subscriber, isActive: true };
  },
  
  updateSubscriberStatus: (id: number, isActive: boolean) => {
    const stmt = sqlite.prepare('UPDATE subscribers SET is_active = ? WHERE id = ?');
    stmt.run(isActive ? 1 : 0, id);
    return db.getSubscriber(id);
  },
  
  // Freelancer operations
  getFreelancer: (id: number) => {
    return sqlite.prepare('SELECT * FROM freelancers WHERE id = ?').get(id);
  },
  
  getFreelancerByUserId: (userId: number) => {
    return sqlite.prepare('SELECT * FROM freelancers WHERE user_id = ?').get(userId);
  },
  
  getFreelancers: () => {
    return sqlite.prepare('SELECT * FROM freelancers').all();
  },
  
  createFreelancer: (freelancer: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO freelancers (user_id, experience, specialties, availability, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      freelancer.userId || null,
      freelancer.experience,
      freelancer.specialties || null,
      freelancer.availability || null,
      'pending'
    );
    
    return { id: result.lastInsertRowid, ...freelancer, status: 'pending' };
  },
  
  updateFreelancerStatus: (id: number, status: string) => {
    const stmt = sqlite.prepare('UPDATE freelancers SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return db.getFreelancer(id);
  },
  
  // Enrollment operations
  getEnrollment: (id: number) => {
    return sqlite.prepare('SELECT * FROM enrollments WHERE id = ?').get(id);
  },
  
  getEnrollmentsByUserId: (userId: number) => {
    return sqlite.prepare('SELECT * FROM enrollments WHERE user_id = ?').all(userId);
  },
  
  getEnrollmentsByProgram: (program: string) => {
    return sqlite.prepare('SELECT * FROM enrollments WHERE program = ?').all(program);
  },
  
  createEnrollment: (enrollment: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO enrollments (user_id, program, start_date, goals, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      enrollment.userId || null,
      enrollment.program,
      enrollment.startDate,
      enrollment.goals || null,
      'pending'
    );
    
    return { id: result.lastInsertRowid, ...enrollment, status: 'pending' };
  },
  
  updateEnrollmentStatus: (id: number, status: string) => {
    const stmt = sqlite.prepare('UPDATE enrollments SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return db.getEnrollment(id);
  },
  
  // Gallery operations
  getGalleryImages: (category?: string) => {
    if (category) {
      return sqlite.prepare('SELECT * FROM gallery_images WHERE category = ? ORDER BY uploaded_at DESC').all(category);
    }
    return sqlite.prepare('SELECT * FROM gallery_images ORDER BY uploaded_at DESC').all();
  },
  
  addGalleryImage: (image: any) => {
    const stmt = sqlite.prepare(`
      INSERT INTO gallery_images (filename, path, alt_text, category, uploaded_by)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      image.filename,
      image.path,
      image.altText || null,
      image.category || null,
      image.uploadedBy || null
    );
    
    return { id: result.lastInsertRowid, ...image };
  },
  
  deleteGalleryImage: (id: number) => {
    // Get the image first to fetch its path
    const image = sqlite.prepare('SELECT * FROM gallery_images WHERE id = ?').get(id);
    
    if (image && typeof image === 'object') {
      const img = image as Record<string, any>;
      if (img.path && typeof img.path === 'string') {
        // Check if file exists, then delete it
        const filePath = path.resolve(img.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    
    // Delete from database
    const stmt = sqlite.prepare('DELETE FROM gallery_images WHERE id = ?');
    stmt.run(id);
    
    return true;
  }
};