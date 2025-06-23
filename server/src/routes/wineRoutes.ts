import { Router } from 'express';
import {
  getAllWines,
  getWineById,
  getRecommendedWines,
  getSurpriseWine
} from '../controllers/wineController';

const router: Router = Router();


router.get('/', getAllWines);
router.get('/search/filter', getRecommendedWines); //This being the 3 that show on the results page, RESTFUL route
router.get('/surprise', getSurpriseWine);
router.get('/:id', getWineById); //Not sure if we need this

export default router;
