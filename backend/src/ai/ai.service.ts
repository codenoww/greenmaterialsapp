import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export type AiInsight = {
  summary: string;
  materialNotes: Record<string, string>;
};

@Injectable()
export class AiService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async enrichRecommendations(input: {
    query: string;
    recommendations: any[];
  }): Promise<AiInsight> {
    // Safe fallback if nothing to enrich
    if (!input.recommendations.length) {
      return {
        summary:
          'No strong sustainability matches were found based on the description.',
        materialNotes: {},
      };
    }

    // (Later you can add real OpenAI calls here)
    return {
      summary:
        'These materials align with sustainability goals inferred from your description.',
      materialNotes: {},
    };
  }
}
