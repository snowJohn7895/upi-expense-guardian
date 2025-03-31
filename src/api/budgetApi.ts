
import apiClient from './apiClient';
import { Budget } from '../backend/models/budgetModel';

export interface BudgetData {
  category: string;
  amount: number;
  period: string;
  startDate?: string;
  endDate?: string;
}

export const getAllBudgets = async () => {
  const response = await apiClient.get<{success: boolean; data: Budget[]}>('/budgets');
  return response.data;
};

export const getBudgetById = async (id: string) => {
  const response = await apiClient.get<{success: boolean; data: Budget}>(`/budgets/${id}`);
  return response.data;
};

export const createBudget = async (budget: BudgetData) => {
  const response = await apiClient.post<{success: boolean; data: Budget}>('/budgets', budget);
  return response.data;
};

export const updateBudget = async (id: string, budget: Partial<BudgetData> & { spent?: number }) => {
  const response = await apiClient.put<{success: boolean; data: Budget}>(`/budgets/${id}`, budget);
  return response.data;
};

export const deleteBudget = async (id: string) => {
  const response = await apiClient.delete<{success: boolean; data: Budget}>(`/budgets/${id}`);
  return response.data;
};
