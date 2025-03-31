
import express from 'express';
import { 
  getExpensesByCategory, 
  getMonthlyTransactions, 
  getRecentTransactions, 
  getTransactionsSummary 
} from '../controllers/analyticsController';

const router = express.Router();

// Analytics routes
router.get('/expenses-by-category', getExpensesByCategory);
router.get('/monthly-transactions', getMonthlyTransactions);
router.get('/recent-transactions', getRecentTransactions);
router.get('/summary', getTransactionsSummary);

export default router;
