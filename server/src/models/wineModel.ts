import type { Wine } from '@prisma/client';

import prisma from '../lib/db';

const findWines = async (country: string, priceBracket: [number, number], pairing: string): Promise<Wine[]> => {
  const [minPrice, maxPrice] = priceBracket;

  return await prisma.wine.findMany({
    where: {
      country,
      price: {
        gte: minPrice,
        lte: maxPrice
      },
      pairings: {
        has: pairing
      }
    }
  });
};

export default findWines;