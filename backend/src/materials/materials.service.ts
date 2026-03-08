import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


/**
 * Core material type
 */
export type Material = {
  id: string;
  name: string;
  category: string;
  description: string;
};

/**
 * Spec sheet type
 */
export type SpecSheet = {
  manufacturer: string;
  application: string;
  composition: string;
  voc: string;
  recycledContent: string;
  region: string;
  standards: string[];
};

@Injectable()
export class MaterialsService {
  /**
   * In-memory materials data (temporary)
   * Later this will come from PostgreSQL via Prisma
   */
  constructor(private readonly prisma: PrismaService) {}
  private materials: Material[] = [
    {
      id: '1',
      name: 'Low VOC Interior Paint',
      category: 'Paint',
      description: 'Reduces indoor air pollution with low VOC emissions.',
    },
    {
      id: '2',
      name: 'Recycled Fly Ash Bricks',
      category: 'Masonry',
      description: 'Uses industrial waste and reduces embodied carbon.',
    },
    {
      id: '3',
      name: 'Bamboo Flooring',
      category: 'Flooring',
      description: 'Rapidly renewable material with high durability.',
    },
  ];

  /**
   * In-memory spec sheets mapped by material ID
   */
  private specSheets: Record<string, SpecSheet> = {
    '1': {
      manufacturer: 'EcoPaint Co.',
      application: 'Interior walls & ceilings',
      composition: 'Water-based acrylic paint',
      voc: '< 5 g/L',
      recycledContent: '0%',
      region: 'India, USA',
      standards: ['Green Seal GS-11', 'LEED v4 compliant'],
    },
    '2': {
      manufacturer: 'GreenBuild Materials',
      application: 'Structural masonry',
      composition: 'Fly ash + recycled aggregates',
      voc: 'N/A',
      recycledContent: '35%',
      region: 'India',
      standards: ['IS 3812', 'LEED MR compliant'],
    },
    '3': {
      manufacturer: 'BambooWorks',
      application: 'Interior flooring',
      composition: 'Rapidly renewable bamboo',
      voc: '< 10 g/L (adhesives)',
      recycledContent: 'N/A',
      region: 'USA',
      standards: ['FSC', 'LEED EQ & MR compliant'],
    },
  };

  /**
   * Get all materials
   * GET /materials
   */
  findAll(): Material[] {
    return this.materials;
  }

  /**
   * Get one material by ID
   * GET /materials/:id
   */
  findOne(id: string): Material | undefined {
    return this.materials.find((m) => m.id === id);
  }

  /**
   * Get spec sheet for a material
   * GET /materials/:id/specsheet
   */
  getSpecSheet(id: string): SpecSheet | null {
    return this.specSheets[id] || null;
  }
  async getLeedInsights(materialId: string) {
  const material = await this.prisma.material.findUnique({
    where: { id: materialId },
    include: {
      attributes: {
        include: {
          attribute: {
            include: {
              credits: {
                include: {
                  leedCredit: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!material) {
    return null;
  }

  const attributes = material.attributes.map(a => ({
    key: a.attribute.key,
    label: a.attribute.label,
  }));

  const potentialLeedCredits = material.attributes.flatMap(a =>
    a.attribute.credits.map(c => ({
      code: c.leedCredit.code,
      name: c.leedCredit.name,
      category: c.leedCredit.category,
      version: c.leedCredit.version,
      note: 'This material may contribute toward this credit',
    }))
  );

  return {
    material: {
      id: material.id,
      name: material.name,
      category: material.category,
    },
    attributes,
    potentialLeedCredits,
  };
}


}
