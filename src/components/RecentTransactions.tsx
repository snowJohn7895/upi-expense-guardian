
import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Coffee, 
  ShoppingCart, 
  Car, 
  Film, 
  Zap, 
  Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  category: 'food' | 'transport' | 'entertainment' | 'shopping' | 'utilities' | 'other';
  paymentMethod: string;
}

interface RecentTransactionsProps {
  limit?: number;
}

// Mock data - would be replaced with actual API data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Breakfast at Cafe',
    amount: 250,
    date: '2023-05-01',
    type: 'expense',
    category: 'food',
    paymentMethod: 'GPay'
  },
  {
    id: '2',
    title: 'Monthly Salary',
    amount: 38000,
    date: '2023-04-30',
    type: 'income',
    category: 'other',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '3',
    title: 'Uber Ride',
    amount: 350,
    date: '2023-04-29',
    type: 'expense',
    category: 'transport',
    paymentMethod: 'PhonePe'
  },
  {
    id: '4',
    title: 'Movie Tickets',
    amount: 600,
    date: '2023-04-28',
    type: 'expense',
    category: 'entertainment',
    paymentMethod: 'GPay'
  },
  {
    id: '5',
    title: 'Grocery Shopping',
    amount: 1200,
    date: '2023-04-27',
    type: 'expense',
    category: 'shopping',
    paymentMethod: 'Paytm'
  },
  {
    id: '6',
    title: 'Electricity Bill',
    amount: 950,
    date: '2023-04-26',
    type: 'expense',
    category: 'utilities',
    paymentMethod: 'PhonePe'
  },
  {
    id: '7',
    title: 'Dinner with Friends',
    amount: 1800,
    date: '2023-04-25',
    type: 'expense',
    category: 'food',
    paymentMethod: 'GPay'
  }
];

const categoryIcons = {
  food: <Utensils size={16} />,
  transport: <Car size={16} />,
  entertainment: <Film size={16} />,
  shopping: <ShoppingCart size={16} />,
  utilities: <Zap size={16} />,
  other: <Coffee size={16} />
};

export const RecentTransactions = ({ limit }: RecentTransactionsProps) => {
  const transactions = limit 
    ? mockTransactions.slice(0, limit)
    : mockTransactions;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-1">
      {transactions.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No transactions to display
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                transaction.type === 'expense' 
                  ? `bg-expense-${transaction.category}/10 text-expense-${transaction.category}`
                  : "bg-emerald-100 text-emerald-600"
              )}>
                {transaction.type === 'expense' 
                  ? categoryIcons[transaction.category] 
                  : <ArrowUp size={16} />
                }
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </span>
                  <Badge variant="outline" className="text-xs px-1">
                    {transaction.paymentMethod}
                  </Badge>
                </div>
              </div>
            </div>
            <div className={cn(
              "font-medium",
              transaction.type === 'expense' ? "text-destructive" : "text-emerald-600"
            )}>
              {transaction.type === 'expense' ? '-' : '+'} ₹{transaction.amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
