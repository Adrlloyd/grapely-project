import { Router } from 'express';

import { getFavourites } from '../controllers/favouritesController'

const router = Router();

router.get('/', getFavourites);

export default router;