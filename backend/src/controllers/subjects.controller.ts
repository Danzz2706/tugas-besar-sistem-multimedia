import { Request, Response } from 'express';
import { db } from '../config/firebase';

export const getSubjects = async (req: Request, res: Response) => {
    try {
        const subjectsSnapshot = await db.collection('subjects').get();
        const subjectsData = [];

        for (const doc of subjectsSnapshot.docs) {
            const subject = doc.data();
            const modulesSnapshot = await db.collection('subjects').doc(doc.id).collection('modules').get();
            const modules = modulesSnapshot.docs.map(m => m.data());

            subjectsData.push({
                ...subject,
                modules
            });
        }

        res.json(subjectsData);
    } catch (error) {
        console.error('Get Subjects Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getSubjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const subjectDoc = await db.collection('subjects').doc(id).get();

        if (!subjectDoc.exists) {
            res.status(404).json({ error: 'Subject not found' });
            return;
        }

        const subject = subjectDoc.data();
        const modulesSnapshot = await db.collection('subjects').doc(id).collection('modules').get();
        const modules = modulesSnapshot.docs.map(m => m.data());

        res.json({
            ...subject,
            modules
        });
    } catch (error) {
        console.error('Get Subject Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
