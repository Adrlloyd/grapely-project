import { Response } from 'express';
import prisma from '../prisma';
import type { AuthenticatedRequest } from '../middleware/auth';

const getUserFavourites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const favourites = await prisma.rating.findMany({
      where: {
        userId,
        score: { gte: 4 },
      },
      include: {
        wine: true,
      },
    });

    const formatted = favourites.map(({ wine, score }) => ({
      ...wine,
      ratings: [{ score }],
    }));

    res.status(200).json({ favourites: formatted });
  } catch (error) {
    console.error('Error fetching favourites:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { getUserFavourites };