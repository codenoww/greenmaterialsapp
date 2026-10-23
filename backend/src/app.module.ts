import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AiModule } from './ai/ai.module';
import { MaterialDatabaseModule } from './material-database/material-database.module';

@Module({
  imports: [
    PrismaModule,
    MaterialsModule,
    MaterialDatabaseModule,
    RecommendationsModule,
    AiModule,
  ],
})
export class AppModule {}
