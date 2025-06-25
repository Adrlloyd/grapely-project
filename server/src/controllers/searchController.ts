import { Request, Response } from 'express';
import prisma from '../prisma';


export const searchResults = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid query parameter' });
  }

  try {
    const wineSearchResults = await prisma.wine.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            grape: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            region: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            country: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
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
      take: 10, // increased limit for better search experience
    });
    res.json(wineSearchResults);
    // console.log(wineSearchResults);
  } catch (error) {
    console.error('Error searching wines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
