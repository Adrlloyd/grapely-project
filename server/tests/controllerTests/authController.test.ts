import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { registerUser, loginUser } from '../../src/controllers/authController';

// mocks
jest.mock('../../src/prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockPrisma = require('../../src/prisma');

describe('Auth Controller', () => {
  //setup mocks
  let mockRequest: Partial<Request>;
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

    // reset mocks
    jest.clearAllMocks();

    // mock the env
    process.env.JWT_SECRET = 'test-secret';

    // stop console.error from being called
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      //mock the user
      const mockUser = {
        id: '1',
        firstName: 'jonny',
        lastName: 'grapeman',
        email: 'john@example.com',
        password: 'hashedPassword',
      };

      const mockToken = 'mock-jwt-token';

      //mock the request
      mockRequest = {
        body: {
          firstName: 'jonny',
          lastName: 'grapeman',
          email: 'john@example.com',
          password: 'password123',
        },
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (JWT.sign as jest.Mock).mockReturnValue(mockToken);
      mockPrisma.user.create.mockResolvedValue(mockUser);

      await registerUser(mockRequest as Request, mockResponse as Response);

      //check that bcrypt hashed the passowrd for 10 rounds
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          firstName: 'jonny',
          lastName: 'grapeman',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
      });
      expect(JWT.sign).toHaveBeenCalledWith(
        { userID: '1', name: 'jonny' },
        'test-secret',
        { expiresIn: '30m' }
      );
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Registration successful',
        id: '1',
        firstName: 'jonny',
        lastName: 'grapeman',
        email: 'john@example.com',
        token: mockToken,
      });
    });

    it('should return 400 when required fields are missing', async () => {
      mockRequest = {
        body: {
          // only give the firstname, other fields are missing
          firstName: 'jonny',
        },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Missing user details. All fields are required.',
      });
    });

    it('should return 409 when email already exists', async () => {
      mockRequest = {
        body: {
          firstName: 'jonny',
          lastName: 'grapeman',
          email: 'john@example.com',
          password: 'password123',
        },
      };

      //mock the prisma error
      const prismaError = new Error('Unique constraint failed');
      (prismaError as any).code = 'P2002';

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrisma.user.create.mockRejectedValue(prismaError);

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(409);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'This email is already linked to a profile',
      });
    });

    it('should return 500 when general error occurs during registration', async () => {
      mockRequest = {
        body: {
          firstName: 'jonny',
          lastName: 'grapeman',
          email: 'john@example.com',
          password: 'password123',
        },
      };

      const generalError = new Error('Database connection failed');

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrisma.user.create.mockRejectedValue(generalError);

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        id: '1',
        firstName: 'jonny',
        lastName: 'grapeman',
        email: 'john@example.com',
        password: 'hashedPassword',
      };

      const mockToken = 'mock-jwt-token';

      mockRequest = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (JWT.sign as jest.Mock).mockReturnValue(mockToken);

      await loginUser(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(JWT.sign).toHaveBeenCalledWith(
        { userID: '1', name: 'jonny' },
        'test-secret',
        { expiresIn: '30m' }
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Login successful',
        id: '1',
        firstName: 'jonny',
        lastName: 'grapeman',
        email: 'john@example.com',
        token: mockToken,
      });
    });

    it('should return 400 when email or password is missing', async () => {
      mockRequest = {
        body: {
          // only give the email, other fields are missing
          email: 'john@example.com',
        },
      };

      await loginUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Both email and password are required',
      });
    });

    it('should return 401 when user is not found', async () => {
      mockRequest = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123',
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await loginUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Invalid email or password',
      });
    });

    it('should return 401 when password is incorrect', async () => {
      const mockUser = {
        id: '1',
        firstName: 'jonny',
        lastName: 'grapeman',
        email: 'john@example.com',
        password: 'hashedPassword',
      };

      mockRequest = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword',
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await loginUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Invalid email or password',
      });
    });

    it('should return 500 when general error occurs during login', async () => {
      mockRequest = {
        body: {
          email: 'john@example.com',
          password: 'password123',
        },
      };

      const generalError = new Error('Database connection failed');
      mockPrisma.user.findUnique.mockRejectedValue(generalError);

      await loginUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });
  });
}); 