"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavourites = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getUserFavourites = async (req, res) => {
    const userId = req.userId;
    try {
        const favourites = await prisma_1.default.rating.findMany({
            where: {
                userId,
                score: {
                    gte: 4
                }
            },
            include: {
                wine: true
            }
        });
        res.status(200).json({
            favourites: favourites.map((rating) => { return rating.wine; })
        });
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUserFavourites = getUserFavourites;
