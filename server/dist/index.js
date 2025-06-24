"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log('Connected to database', `Server listening on port ${PORT}`);
    }
    catch (error) {
        console.error('Failed to connect to database: ', error);
        process.exit(1);
    }
});
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
