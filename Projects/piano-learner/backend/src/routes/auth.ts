import { Router } from 'express';
import { loginUser, registerUser } from '../controller/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import prisma from '../controller/authController';
import { Request, Response } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Geschützte Route
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

export default router;