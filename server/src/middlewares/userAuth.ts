import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import UserModel from '../models/User';
config();

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token: string | undefined;
  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader;
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string };
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload',
      });
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }
    req.user = user;
    next(); // Proceed to next middleware
  } catch (error: any) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
      error: error.message || 'Token verification failed',
    });
  }
};

export default userAuth;
