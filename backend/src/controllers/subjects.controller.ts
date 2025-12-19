import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await prisma.subject.findMany({
            include: {
                modules: {
                    include: {
                        materials: true
                    }
                }
            }
        });
        res.json(subjects);
    } catch (error) {
        console.error('Get Subjects Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getSubjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const subject = await prisma.subject.findUnique({
            where: { id },
            include: {
                modules: {
                    include: {
                        materials: true
                    }
                }
            }
        });

        if (!subject) {
            res.status(404).json({ error: 'Subject not found' });
            return;
        }

        res.json(subject);
    } catch (error) {
        console.error('Get Subject Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
