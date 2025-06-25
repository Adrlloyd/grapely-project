import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();


// GET
const getUserById = async (req: Request, res: Response): Promise<void> => {

  const {id} = req.params;

  try {

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      res.status(404).json({ error: 'User Id does not exist'});
      return;
    }

    res.status(200).json(user);

  } catch (error) {

    console.error('Error fetching user:', error);
    res.status(500).json({error: 'Internal server error'});

  }
};

// PUT
const updateUser = async (req: Request, res: Response): Promise<void> => {

  const {id} = req.params;
  const {firstName, lastName, email, password} = req.body;

  try {

    const user = await prisma.user.update({
      where: {id},
      data: {firstName, lastName, email, password}
    })

    res.status(200).json(user);

  } catch (error) {

    console.error('Error updating user', error);
    res.status(500).json({error: 'Internal servrr error'});

  }
};

// DELETE
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params;

  try {

    await prisma.user.delete({

      where: {id}

    });

    res.status(200).json({message: 'User deleted successfully'});

  } catch (error) {

    console.error('Error deleting user',error);
    res.status(500).json({error: 'Internal servor error'});

  }
};

export { getUserById, updateUser, deleteUser };