import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveQuizResult = async (req: Request, res: Response) => {
    try {
        const { quizId, quizTitle, score, maxScore } = req.body;
        const userId = req.user.uid; // From Auth Middleware

        const result = await prisma.quizResult.create({
            data: {
                userId,
                quizId,
                quizTitle,
                score,
                maxScore
            }
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Save Quiz Result Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserProgress = async (req: Request, res: Response) => {
    try {
        const userId = req.user.uid;

        // Fetch quiz results
        const results = await prisma.quizResult.findMany({
            where: { userId },
            orderBy: { date: 'desc' }
        });

        res.json({
            quizResults: results
        });
    } catch (error) {
        console.error('Get User Progress Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
