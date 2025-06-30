import type { Request, Response } from 'express'
import type { Prisma } from '../generated/prisma';
import prisma from '../prisma';
import { AuthenticatedRequest } from '../middleware/auth';

type FullWine = Prisma.WineGetPayload<{
  include: { ratings: { select: { score: true } } };
}>;

type PartialWine = { price: number; pairingOptions: string[] };

const getRecommendedWines = async (req: Request | AuthenticatedRequest, res: Response): Promise<any> => {
    const { country, priceBracket, pairing } = req.body;
    const userId = (req as AuthenticatedRequest).userId || null;

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

      let recommendedWines: FullWine[] | PartialWine[] = [];

      if (isFinalStep) {
        recommendedWines = await prisma.wine.findMany({
          where: filters,
          include: userId ? {
            ratings: {
              where: { userId },
              select: { score: true },
            }
          } : undefined
        })
      } else {
        recommendedWines = await prisma.wine.findMany({
          where: filters,
          select: {
            price: true,
            pairingOptions: true,
          }
        })
      }
 
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

export { getRecommendedWines }