import { Request, Response } from 'express'
import prisma from '../prisma';

const getUserFavourites = async (req: Request, res: Response): Promise<void> => {
  const { userID } = req.params;
  try {
    const favourites = await prisma.rating.findMany({
      where: {
        userId: userID,
        score: {
          gte: 4
        }
      },
      include: {
        wine: true
      }
    })
    res.status(200).json({
      favourites: favourites.map((rating) => {return rating.wine})
    })
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { getUserFavourites }