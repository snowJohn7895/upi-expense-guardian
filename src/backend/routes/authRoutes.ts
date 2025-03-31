
import express from 'express';
import { login, register, completeOnboarding } from '../controllers/authController';

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/register', register);
router.put('/onboarding/:userId', completeOnboarding);

export default router;
