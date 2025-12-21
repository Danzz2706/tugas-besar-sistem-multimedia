import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { authMiddleware } from './middleware/auth';
import './config/firebase'; // Initialize Firebase


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running with Firebase Firestore' });
});

// Use API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
