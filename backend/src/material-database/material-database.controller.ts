import { Controller, Get, Param, Query } from '@nestjs/common';
import { MaterialDatabaseService } from './material-database.service';
import type { MaterialSection } from './material-database.types';

@Controller('material-database')
export class MaterialDatabaseController {
  constructor(
    private readonly materialDatabaseService: MaterialDatabaseService,
  ) {}

  @Get('sources')
  getSources() {
    return this.materialDatabaseService.getSources();
  }

  @Get('materials')
  searchMaterials(
    @Query('q') q?: string,
    @Query('section') section?: MaterialSection,
    @Query('limit') limit?: string,
  ) {
    return this.materialDatabaseService.searchMaterials({
      q,
      section,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('materials/:id')
  getMaterial(@Param('id') id: string) {
    return this.materialDatabaseService.getMaterial(id);
  }
}
