
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function testConnection() {
    console.log('Testing connection to:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database!');
        const count = await prisma.user.count();
        console.log('User count:', count);
    } catch (error) {
        console.error('Connection failed!');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
