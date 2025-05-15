import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'houseoflegends-secret-key';

// Define our JWT payload interface
interface JwtPayload {
  id: string;
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
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

/**
 * Middleware to check if user is admin
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if user exists and is admin
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied, admin privileges required' });
  }
};

/**
 * Generate JWT token for a user
 * @param user User object
 * @param expiresIn Token expiration time
 */
export const generateToken = (user: any, expiresIn = '7d') => {
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role || 'user'
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

/**
 * Middleware to refresh token
 * @param req Request object
 * @param res Response object
 */
export const refreshToken = (req: Request, res: Response) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }) as JwtPayload;
    
    // Generate new token
    const newToken = generateToken({
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role
    });
    
    return res.status(200).json({ token: newToken });
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
