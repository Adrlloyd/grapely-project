import { Router } from 'express';

import { getWines } from '../controllers/wineController'

const router = Router();

router.post('/', getWines)

export default router;