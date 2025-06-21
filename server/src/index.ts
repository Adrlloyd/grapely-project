import dotenv from 'dotenv';
import app from './app';

import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database', `Server listening on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to database: ', error);
    process.exit(1);
  }
})

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
})
