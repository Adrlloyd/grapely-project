import bcrypt from 'bcrypt';
import { Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import type { AuthenticatedRequest } from '../middleware/auth'

const prisma = new PrismaClient();

// // GET
// const getUserById = async (req: Request, res: Response): Promise<void> => {

//   const {id} = req.params;

//   try {

//     const user = await prisma.user.findUnique({
//       where: { id }
//     })

//     if (!user) {
//       res.status(404).json({ error: 'User Id does not exist'});
//       return;
//     }

//     res.status(200).json(user);

//   } catch (error) {

//     console.error('Error fetching user:', error);
//     res.status(500).json({error: 'Internal server error'});

//   }
// };

// PUT
const updateUserPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;
  try {
    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: 'Both a current and a new password are required to update credentials.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {id: userId}
    });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Current password is incorrect' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password successfully updated.' });
  } catch (error) {
    console.log('Error updating password: ', error);
    res.status(500).json({ error: 'Internal server error'});
  }
};


// DELETE
const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  try {
    await prisma.user.delete({
      where: {id: userId}
    });
    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    console.error('Error deleting user: ',error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export { /*getUserById*/ updateUserPassword, deleteUser };
