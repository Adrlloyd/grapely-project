"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingByUserAndWine = exports.deleteRating = exports.createOrUpdateRating = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createOrUpdateRating = async (req, res) => {
    const { wineId, score } = req.body;
    const userId = req.userId;
    if (!userId || !wineId || typeof score !== 'number') {
        res.status(400).json({ error: 'Missing or invalid input' });
        return;
    }
    if (score <= 0 || score > 5) {
        res.status(400).json({ error: 'Please enter a score between 1 and 5' });
        return;
    }
    try {
        const rating = await prisma_1.default.rating.upsert({
            where: {
                userId_wineId: {
                    userId,
                    wineId
                }
            },
            update: {
                score
            },
            create: {
                userId,
                wineId,
                score
            }
        });
        res.status(200).json({
            message: 'Rating saved',
            rating,
        });
    }
    catch (error) {
        console.error('Error fetching rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createOrUpdateRating = createOrUpdateRating;
const deleteRating = async (req, res) => {
    const { wineId } = req.body;
    const userId = req.userId;
    try {
        await prisma_1.default.rating.delete({
            where: {
                userId_wineId: {
                    userId,
                    wineId
                }
            }
        });
        res.status(200).json({ message: 'Rating deleted' });
    }
    catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteRating = deleteRating;
const getRatingByUserAndWine = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.getRatingByUserAndWine = getRatingByUserAndWine;
