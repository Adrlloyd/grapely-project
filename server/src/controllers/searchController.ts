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
        name: {
          contains: query,
          mode: 'insensitive', // important for case-insensitive search
        },
      },
      select: {
        id: true,
        name: true,
      },
      take: 5, // limit results
    });
    res.json(wineSearchResults);
  } catch (error) {
    console.error('Error searching wines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
