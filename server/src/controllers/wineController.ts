import type { Request, Response } from 'express';
import type { Prisma } from '../generated/prisma';
import prisma from '../prisma';
import type { AuthenticatedRequest } from '../middleware/auth';

type FullWine = Prisma.WineGetPayload<{
  include: { ratings: { select: { score: true } } };
}>;

type PartialWine = { price: number; pairingOptions: string[] };

const getRecommendedWines = async (
  req: Request | AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { country, priceBracket, pairing } = req.body;
  const userId = (req as AuthenticatedRequest).userId || null;

  const filters: Prisma.WineWhereInput = {};
  if (country) filters.country = country;

  if (
    priceBracket?.min !== undefined &&
    priceBracket?.max !== undefined
  ) {
    filters.price = {
      gte: priceBracket.min,
      lt: priceBracket.max,
    };
  }

  if (pairing) {
    filters.pairingOptions = { has: pairing };
  }

  const isFinalStep = Boolean(country && priceBracket && pairing);

  try {
    let recommendedWines: FullWine[] | PartialWine[] = [];

    if (isFinalStep) {
      recommendedWines = await prisma.wine.findMany({
        where: filters,
        include: userId
          ? {
              ratings: {
                where: { userId },
                select: { score: true },
              },
            }
          : undefined,
      });
    } else {
      recommendedWines = await prisma.wine.findMany({
        where: filters,
        select: {
          price: true,
          pairingOptions: true,
        },
      });
    }

    const winesCount = recommendedWines.length;

    if (!isFinalStep && winesCount) {
      const prices = recommendedWines.map((wine) => wine.price);
      const overallPriceBracket =
        priceBracket?.min === undefined || priceBracket?.max === undefined
          ? [Math.min(...prices), Math.max(...prices)]
          : [];

      const availablePairings = pairing
        ? []
        : Array.from(
            new Set(
              recommendedWines.flatMap((wine) => wine.pairingOptions)
            )
          );

      res.status(200).json({
        count: winesCount,
        overallPriceBracket,
        availablePairings,
      });
      return;
    }

    res.status(200).json({
      count: winesCount,
      wines: recommendedWines,
    });
  } catch (error) {
    console.error('Error fetching wines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getRecommendedWines };