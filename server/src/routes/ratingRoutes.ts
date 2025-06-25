import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import type { AuthenticatedRequest } from '../middleware/auth';
import { createOrUpdateRating, deleteRating, getRatingByUserAndWine } from '../controllers/ratingController';

const router = Router();

router.post('/', authenticate, (req, res, next) =>
  createOrUpdateRating(req as AuthenticatedRequest, res).catch(next));
router.get('/:userId/:wineId', authenticate, getRatingByUserAndWine);
router.delete('/',authenticate, (req, res, next) =>
  deleteRating(req as AuthenticatedRequest, res).catch(next));

export default router;