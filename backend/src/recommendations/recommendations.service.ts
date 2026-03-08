import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

interface AiInsight {
  summary: string;
  materialNotes: Record<string, string>;
}

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly prisma: PrismaService,
    private  aiService: AiService,
  ) 
  { {
  console.log("AI SERVICE:", !!aiService);
}}

  async recommend(query: string) {
    if (!query) {
      throw new Error('query is required');
    }

    const normalized = query.toLowerCase();

    const attributeKeywords: Record<string, string> = {
      'low voc': 'low_voc',
      'low-voc': 'low_voc',
      recycled: 'recycled_content',
      renewable: 'rapidly_renewable',
      bamboo: 'rapidly_renewable',
      interior: 'low_voc',
    };

    const matchedAttributeKeys = Object.entries(attributeKeywords)
      .filter(([keyword]) => normalized.includes(keyword))
      .map(([, attr]) => attr);

    const materials = await this.prisma.material.findMany({
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

    const scored = materials.map((material) => {
      const attrs = material.attributes.map(a => a.attribute.key);
      const score = matchedAttributeKeys.filter(k => attrs.includes(k)).length;

      return { material, score };
    });

    const top = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const recommendations = top.map(({ material, score }) => {
      const attributes = material.attributes.map(a => ({
        key: a.attribute.key,
        label: a.attribute.label,
      }));

      const potentialLeedCredits = material.attributes.flatMap(a =>
        a.attribute.credits.map(c => ({
          code: c.leedCredit.code,
          name: c.leedCredit.name,
          category: c.leedCredit.category,
        })),
      );

      return {
        materialId: material.id,
        name: material.name,
        category: material.category,
        matchScore: score,
        whyRecommended: attributes.map(a => a.label),
        attributes,
        potentialLeedCredits,
        disclaimer:
          'This recommendation is exploratory and does not guarantee LEED certification.',
      };
    });

    // ✅ AI overlay — SAFE & typed
   let aiInsight = {
  summary: '',
  materialNotes: {},
};

try {
  const aiResponse = await this.aiService.enrichRecommendations({
    query,
    recommendations,
  });

  aiInsight = {
    summary: aiResponse.summary ?? '',
    materialNotes: {},
  };
} catch {
  aiInsight = {
    summary:
      'AI explanations are currently unavailable. Showing rule-based recommendations.',
    materialNotes: {},
  };
}

    return {
      query,
      recommendations,
      aiInsight,
    };
  }
}
