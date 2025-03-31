
import { Request, Response } from 'express';
import { budgets } from '../models/budgetModel';

export const getAllBudgets = (req: Request, res: Response) => {
  // In a real app, you would filter by user ID from the JWT
  return res.status(200).json({
    success: true,
    count: budgets.length,
    data: budgets
  });
};

export const getBudgetById = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const budget = budgets.find(b => b.id === id);
  
  if (!budget) {
    return res.status(404).json({
      success: false,
      message: 'Budget not found'
    });
  }
  
  return res.status(200).json({
    success: true,
    data: budget
  });
};

export const createBudget = (req: Request, res: Response) => {
  const { category, amount, period, startDate, endDate } = req.body;
  
  if (!category || !amount || !period) {
    return res.status(400).json({
      success: false,
      message: 'Please provide category, amount, and period'
    });
  }
  
  const newBudget = {
    id: (budgets.length + 1).toString(),
    category,
    amount: parseFloat(amount),
    period,
    startDate: startDate || new Date().toISOString(),
    endDate: endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    spent: 0
  };
  
  budgets.push(newBudget);
  
  return res.status(201).json({
    success: true,
    message: 'Budget created successfully',
    data: newBudget
  });
};

export const updateBudget = (req: Request, res: Response) => {
  const id = req.params.id;
  const { category, amount, period, startDate, endDate, spent } = req.body;
  
  const index = budgets.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Budget not found'
    });
  }
  
  // Update budget
  budgets[index] = {
    ...budgets[index],
    category: category || budgets[index].category,
    amount: amount ? parseFloat(amount) : budgets[index].amount,
    period: period || budgets[index].period,
    startDate: startDate || budgets[index].startDate,
    endDate: endDate || budgets[index].endDate,
    spent: spent !== undefined ? parseFloat(spent) : budgets[index].spent
  };
  
  return res.status(200).json({
    success: true,
    message: 'Budget updated successfully',
    data: budgets[index]
  });
};

export const deleteBudget = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const index = budgets.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Budget not found'
    });
  }
  
  // Remove budget
  const deletedBudget = budgets.splice(index, 1)[0];
  
  return res.status(200).json({
    success: true,
    message: 'Budget deleted successfully',
    data: deletedBudget
  });
};
