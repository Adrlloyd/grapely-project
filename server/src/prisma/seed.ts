import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import {newFile} from '../scraper/converter'

const prisma = new PrismaClient();

async function main() {

  // 1. Seed wines
  await prisma.wine.createMany({
    data: newFile,
    skipDuplicates: true
  });

  // 2. Create a sample user
  const hashedPassword = await bcrypt.hash('password123', 10); // Use bcrypt to hash a sample password

  const user = await prisma.user.create({
    data: {
      firstName: 'Sample',
      lastName: 'User',
      email: 'sample@grapely.com',
      password: hashedPassword,
    },
  });

  // 3. Link the user to one wine as a favorite (score of 5)
  const favoriteWine = await prisma.wine.findFirst({
    where: { name: 'Whispering Angel Rosé 2022' },
  });

  if (favoriteWine) {
    await prisma.rating.create({
      data: {
        userId: user.id,
        wineId: favoriteWine.id,
        score: 5,
      },
    });
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed');
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    return prisma.$disconnect();
  });