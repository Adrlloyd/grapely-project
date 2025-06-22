import { Router } from 'express';
import {
  createOrUpdateRating,
  deleteRating,
  getRatingByUserAndWine
} from '../controllers/ratingController';

const router = Router();

router.post('/', createOrUpdateRating);
router.get('/:userId/:wineId', getRatingByUserAndWine);
router.delete('/:id', deleteRating);

export default router;