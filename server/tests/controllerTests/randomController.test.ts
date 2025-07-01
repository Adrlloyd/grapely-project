import { Request, Response } from 'express';
import { getRandomWine } from '../../src/controllers/randomController';

// mocks
jest.mock('../../src/prisma', () => ({
  wine: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
}));

const mockPrisma = require('../../src/prisma');


describe('Random Controller', () => {
  // setup mocks
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

    // stop console.error from being called
    jest.spyOn(console, 'error').mockImplementation(() => { });
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
      mockPrisma.wine.findMany.mockResolvedValue([mockWine]);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.count).toHaveBeenCalled();
      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        skip: expect.any(Number),
        take: 1,
      });
      expect(mockJson).toHaveBeenCalledWith(mockWine);
    });

    it('should handle case when no wines exist', async () => {
      mockRequest = {};

      //mocking the database to return 0 wines and an empty array
      mockPrisma.wine.count.mockResolvedValue(0);
      mockPrisma.wine.findMany.mockResolvedValue([]);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.count).toHaveBeenCalled();
      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
      });
      expect(mockJson).toHaveBeenCalledWith(undefined);
    });

    it('should handle database errors', async () => {
      mockRequest = {};

      const error = new Error('Database error');
      mockPrisma.wine.count.mockRejectedValue(error);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      //expect the 500 status
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });

    it('should handle error during wine fetching', async () => {
      mockRequest = {};

      mockPrisma.wine.count.mockResolvedValue(100);
      const error = new Error('Fetch error');
      mockPrisma.wine.findMany.mockRejectedValue(error);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });

    it('should generate random index within valid range', async () => {
      mockRequest = {};

      //mocking the array to 50 totatl wines to test the range+random index
      const totalWines = 50;
      mockPrisma.wine.count.mockResolvedValue(totalWines);
      mockPrisma.wine.findMany.mockResolvedValue([{ id: '1', name: 'Test Wine' }]);

      await getRandomWine(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        skip: expect.any(Number),
        take: 1,
      });

      // this is to check that the skip value is within the valid range (0-49)
      const findManyCall = mockPrisma.wine.findMany.mock.calls[0][0];
      expect(findManyCall.skip).toBeGreaterThanOrEqual(0);
      expect(findManyCall.skip).toBeLessThan(totalWines);
    });
  });
}); 