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
                name: {
                    contains: query,
                    mode: 'insensitive', // important for case-insensitive search
                },
            },
            select: {
                id: true,
                name: true,
            },
            take: 5, // limit results
        });
        res.json(wineSearchResults);
    }
    catch (error) {
        console.error('Error searching wines:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.searchResults = searchResults;
