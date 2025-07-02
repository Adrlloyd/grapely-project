import bcrypt from 'bcrypt';
import { Response } from 'express';
import prisma from '../prisma';
import type { AuthenticatedRequest } from '../middleware/auth';

const updateUserName = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(400).json({ error: 'First and last name are required.' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName },
    });

    res.status(200).json({ message: 'Name updated successfully.' });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Both current and new passwords are required.' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Current password is incorrect.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    await prisma.user.delete({ where: { id: userId } });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { updateUserName, updateUserPassword, deleteUser };