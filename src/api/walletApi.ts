
import apiClient from './apiClient';
import { Wallet } from '../backend/models/walletModel';

export interface WalletData {
  name: string;
  balance: number;
  type: string;
  currency?: string;
}

export const getAllWallets = async () => {
  const response = await apiClient.get<{success: boolean; data: Wallet[]}>('/wallets');
  return response.data;
};

export const getWalletById = async (id: string) => {
  const response = await apiClient.get<{success: boolean; data: Wallet}>(`/wallets/${id}`);
  return response.data;
};

export const createWallet = async (wallet: WalletData) => {
  const response = await apiClient.post<{success: boolean; data: Wallet}>('/wallets', wallet);
  return response.data;
};

export const updateWallet = async (id: string, wallet: Partial<WalletData>) => {
  const response = await apiClient.put<{success: boolean; data: Wallet}>(`/wallets/${id}`, wallet);
  return response.data;
};

export const deleteWallet = async (id: string) => {
  const response = await apiClient.delete<{success: boolean; data: Wallet}>(`/wallets/${id}`);
  return response.data;
};
