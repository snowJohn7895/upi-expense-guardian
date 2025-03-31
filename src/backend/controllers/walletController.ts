
import { Request, Response } from 'express';
import { wallets } from '../models/walletModel';

export const getAllWallets = (req: Request, res: Response) => {
  // In a real app, you would filter by user ID from the JWT
  return res.status(200).json({
    success: true,
    count: wallets.length,
    data: wallets
  });
};

export const getWalletById = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const wallet = wallets.find(w => w.id === id);
  
  if (!wallet) {
    return res.status(404).json({
      success: false,
      message: 'Wallet not found'
    });
  }
  
  return res.status(200).json({
    success: true,
    data: wallet
  });
};

export const createWallet = (req: Request, res: Response) => {
  const { name, balance, type, currency } = req.body;
  
  if (!name || balance === undefined || !type) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, balance, and type'
    });
  }
  
  const newWallet = {
    id: (wallets.length + 1).toString(),
    name,
    balance: parseFloat(balance),
    type,
    currency: currency || 'INR'
  };
  
  wallets.push(newWallet);
  
  return res.status(201).json({
    success: true,
    message: 'Wallet created successfully',
    data: newWallet
  });
};

export const updateWallet = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, balance, type, currency } = req.body;
  
  const index = wallets.findIndex(w => w.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Wallet not found'
    });
  }
  
  // Update wallet
  wallets[index] = {
    ...wallets[index],
    name: name || wallets[index].name,
    balance: balance !== undefined ? parseFloat(balance) : wallets[index].balance,
    type: type || wallets[index].type,
    currency: currency || wallets[index].currency
  };
  
  return res.status(200).json({
    success: true,
    message: 'Wallet updated successfully',
    data: wallets[index]
  });
};

export const deleteWallet = (req: Request, res: Response) => {
  const id = req.params.id;
  
  const index = wallets.findIndex(w => w.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Wallet not found'
    });
  }
  
  // Remove wallet
  const deletedWallet = wallets.splice(index, 1)[0];
  
  return res.status(200).json({
    success: true,
    message: 'Wallet deleted successfully',
    data: deletedWallet
  });
};
