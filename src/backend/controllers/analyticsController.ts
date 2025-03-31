
import { Request, Response } from 'express';
import { transactions } from '../models/transactionModel';

export const getExpensesByCategory = (req: Request, res: Response) => {
  // Filter transactions for expenses only
  const expenses = transactions.filter(t => t.type === 'expense');
  
  // Group by category
  const categories: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += expense.amount;
  });
  
  // Convert to array for easier consumption by frontend
  const result = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount
  }));
  
  return res.status(200).json({
    success: true,
    data: result
  });
};

export const getMonthlyTransactions = (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);
  
  const monthlyData = months.map(month => {
    // Filter transactions for the current month
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === month;
    });
    
    // Calculate income and expenses
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      month: new Date(currentYear, month, 1).toLocaleString('default', { month: 'short' }),
      income,
      expense
    };
  });
  
  return res.status(200).json({
    success: true,
    data: monthlyData
  });
};

export const getRecentTransactions = (req: Request, res: Response) => {
  // Sort transactions by date (newest first) and take the top 5
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return res.status(200).json({
    success: true,
    data: recentTransactions
  });
};

export const getTransactionsSummary = (req: Request, res: Response) => {
  // Calculate total income
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate total expenses
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate balance
  const balance = totalIncome - totalExpenses;
  
  return res.status(200).json({
    success: true,
    data: {
      totalIncome,
      totalExpenses,
      balance
    }
  });
};
