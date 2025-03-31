
import { Request, Response } from 'express';
import { transactions } from '../models/transactionModel';

export const getAllTransactions = (req: Request, res: Response) => {
  // In a real app, you would filter by user ID from the JWT
  // This is just a mock example
  
  return res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
  });
};

export const getTransactionById = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  return res.status(200).json({
    success: true,
    data: transaction
  });
};

export const createTransaction = (req: Request, res: Response) => {
  const { amount, category, description, date, type } = req.body;
  
  if (!amount || !category || !type) {
    return res.status(400).json({
      success: false,
      message: 'Please provide amount, category, and type'
    });
  }
  
  const newTransaction = {
    id: (transactions.length + 1).toString(),
    amount: parseFloat(amount),
    category,
    description: description || '',
    date: date || new Date().toISOString(),
    type
  };
  
  transactions.push(newTransaction);
  
  return res.status(201).json({
    success: true,
    message: 'Transaction created successfully',
    data: newTransaction
  });
};

export const updateTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  const { amount, category, description, date, type } = req.body;
  
  const index = transactions.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  // Update transaction
  transactions[index] = {
    ...transactions[index],
    amount: amount ? parseFloat(amount) : transactions[index].amount,
    category: category || transactions[index].category,
    description: description || transactions[index].description,
    date: date || transactions[index].date,
    type: type || transactions[index].type
  };
  
  return res.status(200).json({
    success: true,
    message: 'Transaction updated successfully',
    data: transactions[index]
  });
};

export const deleteTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const index = transactions.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  // Remove transaction
  const deletedTransaction = transactions.splice(index, 1)[0];
  
  return res.status(200).json({
    success: true,
    message: 'Transaction deleted successfully',
    data: deletedTransaction
  });
};
