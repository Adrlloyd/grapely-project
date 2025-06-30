import { Router } from 'express';

import { getRecommendedWines } from '../controllers/wineController';

const router: Router = Router();


router.post('/search/filter', getRecommendedWines); //This being the 3 that show on the results page, RESTFUL route


export default router;
