import { Response } from 'express';
import bcrypt from 'bcrypt';
import {
  updateUserName,
  updateUserPassword,
  deleteUser,
} from '../../src/controllers/userController';

// mocks
jest.mock('../../src/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('bcrypt');

const mockPrisma = require('../../src/prisma');

describe('User Controller', () => {
  let mockRequest: Partial<{ userId: string; body: any }>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };

    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('updateUserName', () => {
    it('should update user name successfully', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { firstName: 'Thierry', lastName: 'Henry' },
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      mockPrisma.user.update.mockResolvedValue({});

      await updateUserName(mockRequest as any, mockResponse as Response);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user-1' } });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { firstName: 'Thierry', lastName: 'Henry' },
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Name updated successfully.' });
    });

    it('should return 400 if first or last name missing', async () => {
      mockRequest = {
        userId: 'user-1',
        // missing lastName
        body: { firstName: 'Thierry' },
      };

      await updateUserName(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'First and last name are required.' });
    });

    it('should return 404 if user not found', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { firstName: 'Thierry', lastName: 'Henry' },
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await updateUserName(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    it('should return 500 on prisma error', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { firstName: 'Thierry', lastName: 'Henry' },
      };

      mockPrisma.user.findUnique.mockRejectedValue(new Error('DB error'));

      await updateUserName(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateUserPassword', () => {
    it('should update password successfully', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { currentPassword: 'oldPass', newPassword: 'newPass' },
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-1', password: 'hashedOldPass' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPass');
      mockPrisma.user.update.mockResolvedValue({});

      await updateUserPassword(mockRequest as any, mockResponse as Response);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user-1' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('oldPass', 'hashedOldPass');
      expect(bcrypt.hash).toHaveBeenCalledWith('newPass', 10);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { password: 'hashedNewPass' },
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Password updated successfully.' });
    });

    it('should return 400 if current or new password missing', async () => {
      mockRequest = {
        userId: 'user-1',
        // missing newPassword
        body: { currentPassword: 'oldPass' },
      };

      await updateUserPassword(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Both current and new passwords are required.' });
    });

    it('should return 404 if user not found', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { currentPassword: 'oldPass', newPassword: 'newPass' },
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await updateUserPassword(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    it('should return 401 if current password is incorrect', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { currentPassword: 'wrongPass', newPassword: 'newPass' },
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-1', password: 'hashedOldPass' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await updateUserPassword(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Current password is incorrect.' });
    });

    it('should return 500 on prisma or bcrypt error', async () => {
      mockRequest = {
        userId: 'user-1',
        body: { currentPassword: 'oldPass', newPassword: 'newPass' },
      };

      mockPrisma.user.findUnique.mockRejectedValue(new Error('DB error'));

      await updateUserPassword(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockRequest = {
        userId: 'user-1',
      };

      mockPrisma.user.delete.mockResolvedValue({});

      await deleteUser(mockRequest as any, mockResponse as Response);

      expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'User deleted successfully.' });
    });

    it('should return 500 on prisma error', async () => {
      mockRequest = {
        userId: 'user-1',
      };

      mockPrisma.user.delete.mockRejectedValue(new Error('DB error'));

      await deleteUser(mockRequest as any, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
