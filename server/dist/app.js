"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const wineRoutes_1 = __importDefault(require("./routes/wineRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/wines', wineRoutes_1.default);
// app.use('/favourites', favouriteRoutes);
app.use('/', searchRoutes_1.default);
exports.default = app;
