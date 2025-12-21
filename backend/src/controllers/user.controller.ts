import { Request, Response } from 'express';
import { db } from '../config/firebase';

export const saveQuizResult = async (req: Request, res: Response) => {
    try {
        const { quizId, quizTitle, score, maxScore } = req.body;
        const userId = req.user.uid; // From Auth Middleware

        const newResult = {
            userId,
            quizId,
            quizTitle,
            score,
            maxScore,
            date: new Date().toISOString()
        };

        const docRef = await db.collection('quizResults').add(newResult);

        res.status(201).json({ id: docRef.id, ...newResult });
    } catch (error) {
        console.error('Save Quiz Result Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserProgress = async (req: Request, res: Response) => {
    try {
        const userId = req.user.uid;

        // Fetch quiz results
        const resultsSnapshot = await db.collection('quizResults')
            .where('userId', '==', userId)
            // .orderBy('date', 'desc') // Requires composite index, safe to omit or sort in memory if needed
            .get();

        const results = resultsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Sort in memory to avoid index creation requirements during dev
        results.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        res.json({
            quizResults: results
        });
    } catch (error) {
        console.error('Get User Progress Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
