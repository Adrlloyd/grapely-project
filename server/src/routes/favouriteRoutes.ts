import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth';
import { authenticate } from '../middleware/auth';
import { getUserFavourites } from '../controllers/favouritesController'

const router = Router();

router.get('/', authenticate, (req, res, next) =>
  getUserFavourites(req as AuthenticatedRequest, res).catch(next));

export default router;