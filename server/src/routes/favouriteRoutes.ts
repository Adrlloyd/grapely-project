import { Router } from 'express';

import { getUserFavourites } from '../controllers/favouritesController'

const router = Router();

router.get('/:id/favourites', getUserFavourites);

export default router;