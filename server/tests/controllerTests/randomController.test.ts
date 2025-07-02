import { Request, Response } from 'express';
import { getRandomWine } from '../../src/controllers/randomController';

// mocks
jest.mock('../../src/prisma', () => ({
  wine: {
    count: jest.fn(),
    findFirst: jest.fn(),
  },
}));

const mockPrisma = require('../../src/prisma');

describe('Random Controller', () => {
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

    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getRandomWine', () => {
    it('should return a random wine successfully', async () => {
      const mockWine = {
        id: '1',
        name: 'Random Wine',
        country: 'France',
        price: 25,
        pairingOptions: ['cheese', 'meat'],
      };

      mockRequest = {};

      mockPrisma.wine.count.mockResolvedValue(100);
      mockPrisma.wine.findFirst.mockResolvedValue(mockWine);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.count).toHaveBeenCalled();
      expect(mockPrisma.wine.findFirst).toHaveBeenCalledWith({
        skip: expect.any(Number),
      });
      expect(mockJson).toHaveBeenCalledWith(mockWine);
    });

    it('should handle case when no wines exist', async () => {
      mockRequest = {};

      mockPrisma.wine.count.mockResolvedValue(0);
      mockPrisma.wine.findFirst.mockResolvedValue(undefined);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.count).toHaveBeenCalled();
      expect(mockPrisma.wine.findFirst).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'No wines available',
      });
    });

    it('should handle database errors', async () => {
      mockRequest = {};

      const error = new Error('Database error');
      mockPrisma.wine.count.mockRejectedValue(error);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });

    it('should handle error during wine fetching', async () => {
      mockRequest = {};

      mockPrisma.wine.count.mockResolvedValue(100);
      const error = new Error('Fetch error');
      mockPrisma.wine.findFirst.mockRejectedValue(error);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });

    it('should generate random index within valid range', async () => {
      mockRequest = {};

      const totalWines = 50;
      mockPrisma.wine.count.mockResolvedValue(totalWines);
      mockPrisma.wine.findFirst.mockResolvedValue({ id: '1', name: 'Test Wine' });

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.findFirst).toHaveBeenCalledWith({
        skip: expect.any(Number),
      });

      const findFirstCall = mockPrisma.wine.findFirst.mock.calls[0][0];
      expect(findFirstCall.skip).toBeGreaterThanOrEqual(0);
      expect(findFirstCall.skip).toBeLessThan(totalWines);
    });
  });
});