import { Module } from '@nestjs/common';
import { MaterialDatabaseController } from './material-database.controller';
import { MaterialDatabaseService } from './material-database.service';

@Module({
  controllers: [MaterialDatabaseController],
  providers: [MaterialDatabaseService],
  exports: [MaterialDatabaseService],
})
export class MaterialDatabaseModule {}
