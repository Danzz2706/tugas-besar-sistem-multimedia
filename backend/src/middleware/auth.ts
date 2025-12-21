import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { db } from '../config/firebase';

// Add user property to Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;

        // Sync user to Firestore
        await db.collection('users').doc(decodedToken.uid).set({
            email: decodedToken.email || '',
            name: decodedToken.name || 'User',
            avatar: decodedToken.picture || null,
            lastLogin: new Date().toISOString()
        }, { merge: true });

        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
