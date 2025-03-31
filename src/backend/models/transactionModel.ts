
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

// Mock transaction data
export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
    date: '2023-05-01T10:00:00Z',
    type: 'income'
  },
  {
    id: '2',
    amount: 1000,
    category: 'Rent',
    description: 'Monthly rent payment',
    date: '2023-05-05T14:30:00Z',
    type: 'expense'
  },
  {
    id: '3',
    amount: 500,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2023-05-10T18:45:00Z',
    type: 'expense'
  },
  {
    id: '4',
    amount: 2000,
    category: 'Freelance',
    description: 'Website design project',
    date: '2023-05-15T09:15:00Z',
    type: 'income'
  },
  {
    id: '5',
    amount: 300,
    category: 'Dining',
    description: 'Dinner with friends',
    date: '2023-05-20T20:00:00Z',
    type: 'expense'
  }
];
