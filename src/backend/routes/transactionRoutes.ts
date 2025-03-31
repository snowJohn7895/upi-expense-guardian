
import express from 'express';
import { 
  getAllTransactions, 
  getTransactionById, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transactionController';

const router = express.Router();

// Transaction routes
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
