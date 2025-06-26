import { Request, Response } from 'express';
import prisma from '../prisma';

export const getRandomWine = async (req: Request, res: Response) => {
  try {
    const count = await prisma.wine.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomWine = await prisma.wine.findMany({
      skip: randomIndex,
      take: 1,
    });
    res.json(randomWine[0]);
  } catch (error) {
    console.error('Error fetching random wine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};