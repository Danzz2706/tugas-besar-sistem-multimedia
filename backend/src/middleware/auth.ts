import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

        // Sync user to PostgreSQL
        // We do this here to ensure the user exists in our DB before any other operation
        await prisma.user.upsert({
            where: { id: decodedToken.uid },
            update: {
                email: decodedToken.email || '',
                name: decodedToken.name || 'User',
                avatar: decodedToken.picture || null,
            },
            create: {
                id: decodedToken.uid,
                email: decodedToken.email || '',
                name: decodedToken.name || 'User',
                role: 'student', // Default role
                avatar: decodedToken.picture || null,
            }
        });

        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
