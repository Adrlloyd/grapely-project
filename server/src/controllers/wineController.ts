import { Request, Response } from 'express'

import findWines from '../models/wineModel'

const getWines = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, priceBracket, pairing } = req.body;
    
    if (!country || !priceBracket || !pairing) {
      res.status(400).json({ message: 'Missing information on country of origin, price bracket and/or food pairing' });
      return;
    }
    
    const wines = await XXX.

  } catch (error) {

  }
}

export { getWines }