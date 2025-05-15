import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { db } from '../db';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'houseoflegends-secret-key';

// Define our JWT payload interface
interface JwtPayload {
  id: number;
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to authenticate token
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    // Check if token exists
    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
    return;
  }
};

/**
 * Middleware to check if user is admin
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Check if user exists and is admin
  if (req.user && req.user.role === 'admin') {
    next();
    return;
  }
  res.status(403).json({ message: 'Access denied, admin privileges required' });
  return;
};

/**
 * Generate JWT token for a user
 * @param user User object
 * @param expiresIn Token expiration time
 */
export const generateToken = (user: any, expiresIn = '7d'): string => {
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

/**
 * Middleware to refresh token
 * @param req Request object
 * @param res Response object
 */
export const refreshToken = (req: Request, res: Response): void => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Generate new token
    const newToken = jwt.sign(
      {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: newToken });
    return;
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
    return;
  }
};
