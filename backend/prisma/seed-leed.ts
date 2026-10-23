/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Clear existing data (safe in dev)
  await prisma.leedAttributeMap.deleteMany();
  await prisma.materialAttributeMap.deleteMany();
  await prisma.leedCredit.deleteMany();
  await prisma.materialAttribute.deleteMany();

  // 2. Create material attributes
  const lowVoc = await prisma.materialAttribute.create({
    data: {
      key: 'low_voc',
      label: 'Low Volatile Organic Compounds',
    },
  });

  const recycledContent = await prisma.materialAttribute.create({
    data: {
      key: 'recycled_content',
      label: 'Recycled Content',
    },
  });

  const rapidlyRenewable = await prisma.materialAttribute.create({
    data: {
      key: 'rapidly_renewable',
      label: 'Rapidly Renewable Material',
    },
  });

  // 3. Create LEED credits (v4.1 BD+C)
  const eqLowEmitting = await prisma.leedCredit.create({
    data: {
      code: 'EQc2',
      name: 'Low-Emitting Materials',
      category: 'EQ',
      version: 'LEED v4.1 BD+C',
      description:
        'Reduce concentrations of chemical contaminants that can damage indoor air quality.',
    },
  });

  const mrSourcing = await prisma.leedCredit.create({
    data: {
      code: 'MRc2',
      name: 'Building Product Sourcing',
      category: 'MR',
      version: 'LEED v4.1 BD+C',
      description:
        'Encourage use of responsibly sourced materials, including recycled content.',
    },
  });

  // 4. Map attributes → LEED credits
  await prisma.leedAttributeMap.createMany({
    data: [
      {
        attributeId: lowVoc.id,
        leedCreditId: eqLowEmitting.id,
      },
      {
        attributeId: recycledContent.id,
        leedCreditId: mrSourcing.id,
      },
    ],
  });

  // 5. Assign attributes to materials
  const materials = await prisma.material.findMany();

  const paint = materials.find(m =>
    m.name.toLowerCase().includes('paint')
  );
  const bricks = materials.find(m =>
    m.name.toLowerCase().includes('brick')
  );
  const bamboo = materials.find(m =>
    m.name.toLowerCase().includes('bamboo')
  );

  if (paint) {
    await prisma.materialAttributeMap.create({
      data: {
        materialId: paint.id,
        attributeId: lowVoc.id,
      },
    });
  }

  if (bricks) {
    await prisma.materialAttributeMap.create({
      data: {
        materialId: bricks.id,
        attributeId: recycledContent.id,
      },
    });
  }

  if (bamboo) {
    await prisma.materialAttributeMap.create({
      data: {
        materialId: bamboo.id,
        attributeId: rapidlyRenewable.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log('🏗️ LEED attributes assigned to materials');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
