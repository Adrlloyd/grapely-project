import type { Request, Response } from 'express'
import type { Wine, Prisma } from '../generated/prisma';

import prisma from '../prisma';

// const PRICE_BRACKETS = {
//   cheap: (price: number) => price >= 0 && price < 10,
//   moderatelyCheap: (price: number) => price >= 10 && price < 25,
//   moderatelyExpensive: (price: number) => price >= 25 && price < 50,
//   expensive: (price: number) => price >= 50
// };

const getFilteredWines = async (req: Request, res: Response): Promise<any> => {
  const { country, priceBracket, pairing } = req.body;

  const filters: Prisma.WineWhereInput = {};
  filters.country = country;
  if (priceBracket.min !== undefined && priceBracket.max !== undefined) {
    filters.price = {
      gte: priceBracket.min,
      lt: priceBracket.max
    };
  }
  if (pairing) filters.pairingOptions = { has: pairing };

  try {
    const isFinalStep = country && priceBracket && pairing;

    const filteredWines = await prisma.wine.findMany({
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

    const winesCount = filteredWines.length;

    if (!isFinalStep && winesCount) {
      const overallPriceBracket = (priceBracket.min === undefined || priceBracket.max === undefined)
        ? [Math.min(...filteredWines.map(wine => wine.price)), Math.max(...filteredWines.map(wine => wine.price))]
        : [];

      const availablePairings = !pairing
        ? [...new Set(filteredWines.flatMap(wine => wine.pairingOptions))]
        : [];

      return res.json({
        count: winesCount,
        overallPriceBracket: overallPriceBracket,
        availablePairings: availablePairings,
      })
    }

    return res.json({
      count: winesCount,
      wines: filteredWines,
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

export { getFilteredWines, getAllWines, getWineById, getSurpriseWine }