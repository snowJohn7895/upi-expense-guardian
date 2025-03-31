
import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import walletRoutes from './routes/walletRoutes';
import budgetRoutes from './routes/budgetRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import { authenticate } from './middleware/authMiddleware';
import { errorHandler, notFound } from './middleware/errorMiddleware';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', authenticate, transactionRoutes);
app.use('/api/wallets', authenticate, walletRoutes);
app.use('/api/budgets', authenticate, budgetRoutes);
app.use('/api/analytics', authenticate, analyticsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Export for importing into server.ts
export default app;
