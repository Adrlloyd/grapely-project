import { Request, Response } from 'express';
import { getRecommendedWines } from '../../src/controllers/wineController';

//mocks
jest.mock('../../src/prisma', () => ({
  wine: {
    findMany: jest.fn(),
  },
}));

const mockPrisma = require('../../src/prisma');

describe('Wine Controller', () => {
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

    // clear mocks
    jest.clearAllMocks();

    // stop console.error from being called
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  describe('getRecommendedWines', () => {
    it('should return wines when all filters are provided (final step)', async () => {
      const mockWines = [
        {
          id: '1',
          name: 'Test Wine 1',
          country: 'France',
          price: 25,
          pairingOptions: ['cheese', 'meat'],
        },
        {
          id: '2',
          name: 'Test Wine 2',
          country: 'France',
          price: 30,
          pairingOptions: ['fish', 'poultry'],
        },
      ];

      mockRequest = {
        body: {
          country: 'France',
          priceBracket: { min: 20, max: 40 },
          pairing: 'cheese',
        },
      };

      mockPrisma.wine.findMany.mockResolvedValue(mockWines);

      await getRecommendedWines(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        where: {
          country: 'France',
          price: {
            gte: 20,
            lt: 40,
          },
          pairingOptions: {
            has: 'cheese',
          },
        },
      });

      expect(mockJson).toHaveBeenCalledWith({
        count: 2,
        wines: mockWines,
      });
    });

    it('should return count and available options when not final step (no pairing)', async () => {
      const mockWines = [
        {
          price: 25,
          pairingOptions: ['cheese', 'meat'],
        },
        {
          price: 30,
          pairingOptions: ['fish', 'poultry'],
        },
        {
          price: 35,
          pairingOptions: ['cheese', 'dessert'],
        },
      ];

      mockRequest = {
        body: {
          country: 'France',
          priceBracket: { min: 20, max: 40 },
          // No pairing provided
        },
      };

      mockPrisma.wine.findMany.mockResolvedValue(mockWines);

      await getRecommendedWines(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        where: {
          country: 'France',
          price: {
            gte: 20,
            lt: 40,
          },
        },
        select: {
          price: true,
          pairingOptions: true,
        },
      });

      expect(mockJson).toHaveBeenCalledWith({
        count: 3,
        overallPriceBracket: [],
        availablePairings: ['cheese', 'meat', 'fish', 'poultry', 'dessert'],
      });
    });

    it('should return count and overall price bracket when no price bracket provided', async () => {
      const mockWines = [
        {
          price: 25,
          pairingOptions: ['cheese'],
        },
        {
          price: 30,
          pairingOptions: ['meat'],
        },
      ];

      mockRequest = {
        body: {
          country: 'France',
          // No price bracket provided
          pairing: 'cheese',
        },
      };

      mockPrisma.wine.findMany.mockResolvedValue(mockWines);

      await getRecommendedWines(mockRequest as Request, mockResponse as Response);

      expect(mockPrisma.wine.findMany).toHaveBeenCalledWith({
        where: {
          country: 'France',
          pairingOptions: {
            has: 'cheese',
          },
        },
        select: {
          price: true,
          pairingOptions: true,
        },
      });

      expect(mockJson).toHaveBeenCalledWith({
        count: 2,
        overallPriceBracket: [25, 30],
        availablePairings: [],
      });
    });

    it('should handle database errors gracefully', async () => {
      mockRequest = {
        body: {
          country: 'France',
          priceBracket: { min: 20, max: 40 },
          pairing: 'cheese',
        },
      };

      const error = new Error('Database error');
      mockPrisma.wine.findMany.mockRejectedValue(error);

      await getRecommendedWines(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Server error',
      });
    });

    it('should handle empty results', async () => {
      mockRequest = {
        body: {
          country: 'NonExistentCountry',
          priceBracket: { min: 20, max: 40 },
          pairing: 'cheese',
        },
      };

      mockPrisma.wine.findMany.mockResolvedValue([]);

      await getRecommendedWines(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith({
        count: 0,
        wines: [],
      });
    });
  });
}); 