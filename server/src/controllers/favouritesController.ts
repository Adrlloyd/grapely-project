import { Request, Response } from 'express'
import prisma from '../prisma';
import type { AuthenticatedRequest } from '../middleware/auth'


const getUserFavourites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  try {
    const favourites = await prisma.rating.findMany({
      where: {
        userId,
        score: {
          gte: 4
        }
      },
      include: {
        wine: true
      }
    })

    // res.status(200).json({
    //   favourites: favourites.map((rating) => {return rating.wine})
    // })

    res.status(200).json({
      favourites: favourites.map((rating) => {
        return {
          ...rating.wine,
          ratings: [{ score: rating.score }] // manually attach user's rating
        };
      })
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { getUserFavourites }