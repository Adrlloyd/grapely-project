"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurpriseWine = exports.getWineById = exports.getAllWines = exports.getRecommendedWines = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// const PRICE_BRACKETS = {
//   cheap: (price: number) => price >= 0 && price < 10,
//   moderatelyCheap: (price: number) => price >= 10 && price < 25,
//   moderatelyExpensive: (price: number) => price >= 25 && price < 50,
//   expensive: (price: number) => price >= 50
// };
const getRecommendedWines = async (req, res) => {
    const { country, priceBracket, pairing } = req.body;
    const filters = {};
    filters.country = country;
    if (priceBracket.min !== undefined && priceBracket.max !== undefined) {
        filters.price = {
            gte: priceBracket.min,
            lt: priceBracket.max
        };
    }
    if (pairing)
        filters.pairingOptions = { has: pairing };
    try {
        const isFinalStep = country && priceBracket && pairing;
        const recommendedWines = await prisma_1.default.wine.findMany({
            where: filters,
            ...(isFinalStep
                ? {}
                : {
                    select: {
                        price: true,
                        pairingOptions: true,
                    }
                })
        });
        const winesCount = recommendedWines.length;
        if (!isFinalStep && winesCount) {
            const overallPriceBracket = (priceBracket.min === undefined || priceBracket.max === undefined)
                ? [Math.min(...recommendedWines.map(wine => wine.price)), Math.max(...recommendedWines.map(wine => wine.price))]
                : [];
            const availablePairings = !pairing
                ? [...new Set(recommendedWines.flatMap(wine => wine.pairingOptions))]
                : [];
            return res.json({
                count: winesCount,
                overallPriceBracket: overallPriceBracket,
                availablePairings: availablePairings,
            });
        }
        return res.json({
            count: winesCount,
            wines: recommendedWines,
        });
    }
    catch (error) {
        console.error('Error fetching wines: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getRecommendedWines = getRecommendedWines;
const getAllWines = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.getAllWines = getAllWines;
const getWineById = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.getWineById = getWineById;
const getSurpriseWine = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.getSurpriseWine = getSurpriseWine;
