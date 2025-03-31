
export interface Wallet {
  id: string;
  name: string;
  balance: number;
  type: string;
  currency: string;
}

// Mock wallet data
export const wallets: Wallet[] = [
  {
    id: '1',
    name: 'Cash',
    balance: 5000,
    type: 'cash',
    currency: 'INR'
  },
  {
    id: '2',
    name: 'Bank Account',
    balance: 25000,
    type: 'bank',
    currency: 'INR'
  },
  {
    id: '3',
    name: 'UPI',
    balance: 7500,
    type: 'upi',
    currency: 'INR'
  }
];
