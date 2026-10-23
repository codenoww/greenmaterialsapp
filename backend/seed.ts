import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (safe in dev)
  await prisma.specSheet.deleteMany();
  await prisma.material.deleteMany();

  // Create materials with spec sheets
  await prisma.material.create({
    data: {
      name: 'Low VOC Interior Paint',
      category: 'Paint',
      description: 'Reduces indoor air pollution with low VOC emissions.',
      specSheet: {
        create: {
          manufacturer: 'EcoPaint Co.',
          application: 'Interior walls & ceilings',
          composition: 'Water-based acrylic paint',
          voc: '< 5 g/L',
          recycledContent: '0%',
          region: 'India, USA',
        },
      },
    },
  });

  await prisma.material.create({
    data: {
      name: 'Recycled Fly Ash Bricks',
      category: 'Masonry',
      description: 'Uses industrial waste and reduces embodied carbon.',
      specSheet: {
        create: {
          manufacturer: 'GreenBuild Materials',
          application: 'Structural masonry',
          composition: 'Fly ash + recycled aggregates',
          voc: 'N/A',
          recycledContent: '35%',
          region: 'India',
        },
      },
    },
  });

  await prisma.material.create({
    data: {
      name: 'Bamboo Flooring',
      category: 'Flooring',
      description: 'Rapidly renewable material with high durability.',
      specSheet: {
        create: {
          manufacturer: 'BambooWorks',
          application: 'Interior flooring',
          composition: 'Rapidly renewable bamboo',
          voc: '< 10 g/L (adhesives)',
          recycledContent: 'N/A',
          region: 'USA',
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log('🌱 Database seeded successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
