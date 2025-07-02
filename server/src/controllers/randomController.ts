import { Request, Response } from 'express';
import prisma from '../prisma';

const getRandomWine = async (_req: Request, res: Response): Promise<void> => {
  try {
    const totalWines = await prisma.wine.count();

    if (totalWines === 0) {
      res.status(404).json({ error: 'No wines available' });
      return;
    }

    const randomWine = await prisma.wine.findFirst({
      skip: Math.floor(Math.random() * totalWines),
    });

    res.status(200).json(randomWine);
  } catch (error) {
    console.error('Error fetching random wine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getRandomWine };