
import express from 'express';
import { 
  getAllWallets, 
  getWalletById, 
  createWallet, 
  updateWallet, 
  deleteWallet 
} from '../controllers/walletController';

const router = express.Router();

// Wallet routes
router.get('/', getAllWallets);
router.get('/:id', getWalletById);
router.post('/', createWallet);
router.put('/:id', updateWallet);
router.delete('/:id', deleteWallet);

export default router;
