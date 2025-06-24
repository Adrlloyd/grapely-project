import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { getUserFavourites } from '../controllers/favouritesController'

const router = Router();

router.get('/:id/favourites', authenticate, getUserFavourites);

export default router;