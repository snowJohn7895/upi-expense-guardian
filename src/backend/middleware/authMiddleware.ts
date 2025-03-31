
import { Request, Response, NextFunction } from 'express';

// Mock authentication middleware
// In a real app, this would verify JWT tokens
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  // This is a mock implementation
  // In a real app, you would verify the JWT token
  if (authHeader.startsWith('Bearer mock-jwt-token-')) {
    // Extract user ID from token for demo purposes
    const userId = authHeader.split('-').pop();
    
    // Attach user ID to request object for use in controller
    (req as any).userId = userId;
    
    return next();
  }
  
  return res.status(401).json({
    success: false,
    message: 'Invalid token'
  });
};
