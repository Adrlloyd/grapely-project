import { Router } from 'express';
// import { getFavourites } from '../controllers/favouritesController'

const router = Router();

router.post('/', async (req,res) => {
  const body = await 'Here are your favourite wines - Chardonnay, Riesling, Hock.'
})

export default router;