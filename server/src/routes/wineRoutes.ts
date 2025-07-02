import { Router } from 'express';

import { getRecommendedWines } from '../controllers/wineController';

import { optionalAuthenticate } from '../middleware/auth';
import type { AuthenticatedRequest } from '../middleware/auth';

const router: Router = Router();


router.post('/search/filter', optionalAuthenticate, (req, res, next) =>
  getRecommendedWines(req as AuthenticatedRequest, res).catch(next));


export default router;
