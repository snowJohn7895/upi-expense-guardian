
import apiClient from './apiClient';
import { Transaction } from '../backend/models/transactionModel';

export interface TransactionData {
  amount: number;
  category: string;
  description?: string;
  date?: string;
  type: 'income' | 'expense';
}

export const getAllTransactions = async () => {
  const response = await apiClient.get<{success: boolean; data: Transaction[]}>('/transactions');
  return response.data;
};

export const getTransactionById = async (id: string) => {
  const response = await apiClient.get<{success: boolean; data: Transaction}>(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (transaction: TransactionData) => {
  const response = await apiClient.post<{success: boolean; data: Transaction}>('/transactions', transaction);
  return response.data;
};

export const updateTransaction = async (id: string, transaction: Partial<TransactionData>) => {
  const response = await apiClient.put<{success: boolean; data: Transaction}>(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await apiClient.delete<{success: boolean; data: Transaction}>(`/transactions/${id}`);
  return response.data;
};
