import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { authMiddleware } from './middleware/auth';
import * as admin from 'firebase-admin';
import path from 'path';

dotenv.config();

// Initialize Firebase Admin (Only once)
if (!admin.apps.length) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.warn('WARNING: serviceAccountKey.json not found or invalid.');
    }
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running with Prisma + Postgres' });
});

// Use API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
