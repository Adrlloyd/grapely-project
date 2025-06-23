import { Router } from 'express';

import { getFilteredWines } from '../controllers/wineController'

const router = Router();

router.post('/', getFilteredWines)

export default router;