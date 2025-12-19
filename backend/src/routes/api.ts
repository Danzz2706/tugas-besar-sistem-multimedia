import { Router } from 'express';
import { getSubjects, getSubjectById } from '../controllers/subjects.controller';
import { saveQuizResult, getUserProgress } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes (if any) or Protected routes
// Since the app requires login for most things, we protect these.
// Actually, subjects might be visible freely? 
// For now, allow subjects to be public, but progress requires auth.

router.get('/subjects', getSubjects);
router.get('/subjects/:id', getSubjectById);

router.use(authMiddleware);

router.post('/user/quiz-result', saveQuizResult);
router.get('/user/progress', getUserProgress);

export default router;
