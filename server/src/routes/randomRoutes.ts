import { Router } from 'express';
import { getRandomWine } from '../controllers/randomController';

const router = Router();

router.get('/', getRandomWine);

export default router;