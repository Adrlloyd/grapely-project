import { Request, Response } from 'express'

import prisma from '../prisma';

const getUserFavourites = async (req: Request, res: Response): Promise<void> => {
  const { userID } = req.params;
  try {
    const favourites = await prisma.rating.findMany({

    })
  } catch (error) {

  }
}

export { getUserFavourites }