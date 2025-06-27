import type { Request, Response } from 'express'
import type { Prisma } from '../generated/prisma';

import prisma from '../prisma';

const getRecommendedWines = async (req: Request, res: Response): Promise<any> => {
    const { country, priceBracket, pairing } = req.body;

    const filters: Prisma.WineWhereInput = {};
    filters.country = country;
    if (priceBracket && priceBracket.min !== undefined && priceBracket.max !== undefined) {
      filters.price = {
        gte: priceBracket.min,
        lt: priceBracket.max
      };
    }
    if (pairing) filters.pairingOptions = { has: pairing };

    try {
      const isFinalStep = country && priceBracket && pairing;

      const recommendedWines = await prisma.wine.findMany({
        where: filters,
        ...(isFinalStep
          ? {}
          : {
              select: {
                price: true,
                pairingOptions: true,
              }
            })
      }); 

      const winesCount = recommendedWines.length;

      if (!isFinalStep && winesCount) {
        const overallPriceBracket = (!priceBracket || priceBracket.min === undefined || priceBracket.max === undefined)
          ? [Math.min(...recommendedWines.map(wine => wine.price)), Math.max(...recommendedWines.map(wine => wine.price))]
          : [];

        const availablePairings = !pairing
          ? [...new Set(recommendedWines.flatMap(wine => wine.pairingOptions))]
          : [];

        return res.json({
          count: winesCount,
          overallPriceBracket: overallPriceBracket,
          availablePairings: availablePairings,
        })
      }

      return res.json({
        count: winesCount,
        wines: recommendedWines,
      });

    } catch (error) {
      console.error('Error fetching wines: ', error);
      res.status(500).json({ message: 'Server error' });
    }
}

const getAllWines = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {

  }
};

const getWineById = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {

  }
};

const getSurpriseWine = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {

  }
};

export { getRecommendedWines, getAllWines, getWineById, getSurpriseWine }