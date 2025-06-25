"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFile = void 0;
const wines_json_1 = __importDefault(require("./wines.json"));
exports.newFile = wines_json_1.default.map(wine => ({
    name: wine.name + ' ' + wine.year,
    grape: wine.grape ?? "",
    color: wine.wineType?.replace(/ wine/i, '') ?? "",
    sparkling: wine.wineType?.toLowerCase().includes('sparkling') || false,
    region: wine.region ?? "",
    country: wine.country ?? "",
    price: parseFloat(wine.price?.replace(/,/g, '') ?? "0"),
    image_url: wine.image ?? "",
    description: wine.description ?? "",
    pairingOptions: wine.foodPairing ?? []
}));
