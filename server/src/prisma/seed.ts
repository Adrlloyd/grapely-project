import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.wine.createMany({
    data: [
      {
        name: 'Château Margaux 2015',
        grape: 'Cabernet Sauvignon',
        color: 'Red',
        sparkling: false,
        region: 'Bordeaux',
        country: 'France',
        price: 799.99,
        image_url:
          'https://www.finewinedirect.co.uk/cdn/shop/products/chateau_margaux_d3911ba9-d750-4806-afd3-1a21156833d6_480x480.png?v=1549643511',
        description:
          'A full-bodied, complex red wine with notes of blackberry, truffle, and oak.',
          pairingOptions: ['Red Meat']
      },
      {
        name: 'Dom Pérignon Vintage 2012',
        grape: 'Chardonnay & Pinot Noir',
        color: 'White',
        sparkling: true,
        region: 'Champagne',
        country: 'France',
        price: 249.99,
        image_url:
          'https://www.finewinedirect.co.uk/cdn/shop/products/dom_perignon_2009_0090e9e9-b136-4b47-bde2-d9f04c89eeff.jpg?v=1644490274',
        description:
          'An iconic sparkling wine with aromas of brioche, citrus, and almond.',
        pairingOptions: ['Poultry', 'Seafood', 'Vegetables', 'Cheese', 'Dessert']
      },
      {
        name: 'Whispering Angel Rosé 2022',
        grape: 'Grenache & Cinsault',
        color: 'Rosé',
        sparkling: false,
        region: 'California',
        country: 'United States of America',
        price: 29.99,
        image_url: 'https://www.finewinedirect.co.uk/cdn/shop/products/whisperingangel1bottle_f2819c93-634d-4d71-97c1-7cab2995dcf1_473x473.jpg?v=1678384325',
        description:
          'A fresh and elegant rosé with delicate aromas of strawberry, peach, and citrus blossom. Crisp, dry, and perfect for warm days.',
        pairingOptions: ['Just drinking!', 'Red Meat', 'Poultry', 'Seafood', 'Vegetables', 'Cheese', 'Dessert']
      },
      {
        name: 'Cloudy Bay Sauvignon Blanc 2021',
        grape: 'Sauvignon Blanc',
        color: 'White',
        sparkling: false,
        region: 'Marlborough',
        country: 'New Zealand',
        price: 33.5,
        image_url:
          'https://www.laithwaites.co.uk/images/uk/en/law/product/0927721b.png',
        description:
          'Crisp and vibrant with flavors of tropical fruit, lime, and fresh herbs.',
        pairingOptions: ['Just drinking!', 'Poultry', 'Seafood', 'Vegetables', 'Cheese', 'Dessert']
      },
    ],
  });
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