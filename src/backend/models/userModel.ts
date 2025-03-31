
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isOnboarded: boolean;
}

// Mock user data
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    isOnboarded: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    isOnboarded: false
  }
];
