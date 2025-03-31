
export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: string;
  startDate: string;
  endDate: string;
  spent: number;
}

// Mock budget data
export const budgets: Budget[] = [
  {
    id: '1',
    category: 'Groceries',
    amount: 5000,
    period: 'monthly',
    startDate: '2023-05-01T00:00:00Z',
    endDate: '2023-05-31T23:59:59Z',
    spent: 2500
  },
  {
    id: '2',
    category: 'Entertainment',
    amount: 2000,
    period: 'monthly',
    startDate: '2023-05-01T00:00:00Z',
    endDate: '2023-05-31T23:59:59Z',
    spent: 750
  },
  {
    id: '3',
    category: 'Transportation',
    amount: 3000,
    period: 'monthly',
    startDate: '2023-05-01T00:00:00Z',
    endDate: '2023-05-31T23:59:59Z',
    spent: 1200
  }
];
