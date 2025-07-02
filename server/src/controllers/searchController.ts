import { Request, Response } from 'express';
import prisma from '../prisma';

const searchResults = async (req: Request, res: Response): Promise<void> => {
  const queryParam = req.query.query;

  if (typeof queryParam !== 'string' || !queryParam.trim()) {
    res.status(400).json({ error: 'Missing or invalid query parameter' });
    return;
  }

  try {
    const wines = await prisma.wine.findMany({
      where: {
        OR: ['name', 'grape', 'region', 'country'].map((field) => ({
          [field]: {
            contains: queryParam,
            mode: 'insensitive',
          },
        })),
      },
      select: {
        id: true,
        name: true,
        grape: true,
        color: true,
        sparkling: true,
        region: true,
        country: true,
        price: true,
        image_url: true,
        description: true,
        pairingOptions: true,
        created_at: true,
        updated_at: true,
      },
      take: 10,
    });

    res.status(200).json(wines);
  } catch (error) {
    console.error('Error searching wines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { searchResults };