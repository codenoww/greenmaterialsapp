import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    MaterialsModule,
    RecommendationsModule,
    AiModule,
  ],
})
export class AppModule {}
