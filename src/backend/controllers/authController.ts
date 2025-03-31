
import { Request, Response } from 'express';
import { users } from '../models/userModel';

// Mock user authentication
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Simple mock validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide email and password' 
    });
  }
  
  // In a real app, you would check against a database and use proper authentication
  // This is just a mock example
  const user = users.find(user => user.email === email);
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
  
  // In a real app, you would verify password hash, generate JWT, etc.
  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      isOnboarded: user.isOnboarded,
      // Don't send the password back!
    },
    token: 'mock-jwt-token-' + user.id // In a real app, this would be a proper JWT
  });
};

export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email, and password' 
    });
  }
  
  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  
  if (userExists) {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password, // In a real app, you would hash this
    isOnboarded: false
  };
  
  // Add to mock database
  users.push(newUser);
  
  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isOnboarded: newUser.isOnboarded
    }
  });
};

export const completeOnboarding = (req: Request, res: Response) => {
  const userId = req.params.userId;
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  
  // Update user's onboarding status
  users[userIndex].isOnboarded = true;
  
  return res.status(200).json({
    success: true,
    message: 'Onboarding completed successfully',
    data: {
      isOnboarded: true
    }
  });
};
