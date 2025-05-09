import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        req.user = decoded; // Benutzer-ID im Request speichern
        next(); // Weiter zur nächsten Middleware oder Route
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};