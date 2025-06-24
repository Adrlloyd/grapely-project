import { Router } from 'express';

import { searchResults } from '../controllers/searchController'

const router = Router();

router.get('/search', searchResults);

export default router;