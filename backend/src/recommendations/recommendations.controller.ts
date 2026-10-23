import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  // ✅ GET endpoint (for browser & mobile)
  @Get()
  recommendGet(@Query('query') query: string) {
    return this.recommendationsService.recommend(query);
  }

  // ✅ POST endpoint (optional, keep if you want)
  @Post()
  recommendPost(
    @Body('designDescription') designDescription: string,
  ) {
    return this.recommendationsService.recommend(designDescription);
  }
}
