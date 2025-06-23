import { Router } from 'express';

import { getUserFavorites } from '../controllers/favouritesController'

const router = Router();

router.get('/:id/favorites', getUserFavorites);

export default router;