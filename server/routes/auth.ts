import { Router } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { storage } from '../storage';
import { authenticate, generateToken, refreshToken } from '../middleware/auth';
import { User } from '../shared/schema';

const router = Router();

// Registration schema
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  role: z.enum(['user', 'admin']).default('user').optional(),
});

// Login schema
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(data.username) as User | null;
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Check if email already exists
    const existingEmail = await storage.getUserByEmail(data.email) as User | null;
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Create user
    const user = await storage.createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      role: data.role || 'user',
    }) as User;
    
    // Generate token
    const token = generateToken(user);
    
    // Return user data (without password) and token
    return res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        details: fromZodError(error).message,
      });
    }
    
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    
    // Get user by username
    const user = await storage.getUserByUsername(username) as User;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    // Return user data and token
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        details: fromZodError(error).message,
      });
    }
    
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route GET /api/auth/me
 * @desc Get current user
 * @access Private
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Get user by ID
    const user = await storage.getUserById(userId) as User;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user data without password
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route POST /api/auth/refresh
 * @desc Refresh token
 * @access Public
 */
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    
    // Set token in the authorization header for the refreshToken middleware
    req.headers.authorization = `Bearer ${token}`;
    
    // Call the refreshToken middleware directly
    return refreshToken(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
