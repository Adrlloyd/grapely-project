import { Request, Response } from 'express';

import prisma from '../prisma';

import type { AuthenticatedRequest } from '../middleware/auth'

const createOrUpdateRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { wineId, score } = req.body;
  const userId = req.userId;

  if (!userId || !wineId || typeof score !== 'number') {
    res.status(400).json({ error: 'Missing or invalid input' });
    return;
  }

  if (score <= 0 || score > 5) {
    res.status(400).json({ error: 'Please enter a score between 1 and 5' });
    return;
  }

  try {
    const rating = await prisma.rating.upsert({
      where: {
        userId_wineId: {
          userId,
          wineId
        }
      },
      update: {
        score
      },
      create: {
        userId,
        wineId,
        score
      }
    });

  res.status(200).json({
    message: 'Rating saved',
    rating,
  })
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

const deleteRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { wineId } = req.body;
  const userId = req.userId;

  try {
    await prisma.rating.delete({
      where: {
        userId_wineId: {
          userId,
          wineId
        }
      }
    });    
    res.status(200).json({ message: 'Rating deleted' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getRatingByUserAndWine = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {

  }
};

export { createOrUpdateRating, deleteRating, getRatingByUserAndWine };