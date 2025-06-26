"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchResults = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const searchResults = async (req, res) => {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid query parameter' });
    }
    try {
        const wineSearchResults = await prisma_1.default.wine.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        grape: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        region: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        country: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                grape: true,
                color: true,
                sparkling: true,
                region: true,
                country: true,
                price: true,
                image_url: true,
                description: true,
                pairingOptions: true,
                created_at: true,
                updated_at: true,
            },
            take: 10, // increased limit for better search experience
        });
        res.json(wineSearchResults);
        // console.log(wineSearchResults);
    }
    catch (error) {
        console.error('Error searching wines:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.searchResults = searchResults;
