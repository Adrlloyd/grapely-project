import { Request, Response } from 'express'

import findWines from '../models/wineModel'

const getWines = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, priceBracket, pairing } = req.body;
    if (!country || !priceBracket || !pairing) {
      res.status(400).json({ message: 'Missing information on country of origin, price bracket and/or food pairing' });
      return;
    }
    const wines = await findWines(country, priceBracket, pairing);
    res.status(200).json(wines);
  } catch (error) {
    console.error('Error fetching wine list: ', error);
    res.status(500).json({ message: 'Could not retrieve wine list' });
  }
}

export { getWines }