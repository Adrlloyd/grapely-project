import type { Wine } from '../generated/prisma';

import prisma from '../prisma';

const findWines = async (country: string, priceBracket: [number, number], pairing: string): Promise<Wine[]> => {
  const [minPrice, maxPrice] = priceBracket;

  return await prisma.wine.findMany({
    where: {
      country,
      price: {
        gte: minPrice,
        lte: maxPrice
      },
      pairingOptions: {
        has: pairing
      }
    }
  });
};

export default findWines;