
import apiClient from './apiClient';
import { Transaction } from '../backend/models/transactionModel';

export interface CategoryExpense {
  category: string;
  amount: number;
}

export interface MonthlyTransaction {
  month: string;
  income: number;
  expense: number;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const getExpensesByCategory = async () => {
  const response = await apiClient.get<{success: boolean; data: CategoryExpense[]}>('/analytics/expenses-by-category');
  return response.data;
};

export const getMonthlyTransactions = async () => {
  const response = await apiClient.get<{success: boolean; data: MonthlyTransaction[]}>('/analytics/monthly-transactions');
  return response.data;
};

export const getRecentTransactions = async () => {
  const response = await apiClient.get<{success: boolean; data: Transaction[]}>('/analytics/recent-transactions');
  return response.data;
};

export const getTransactionsSummary = async () => {
  const response = await apiClient.get<{success: boolean; data: TransactionSummary}>('/analytics/summary');
  return response.data;
};
