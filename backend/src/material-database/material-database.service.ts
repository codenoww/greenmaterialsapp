import { Injectable } from '@nestjs/common';
import {
  MaterialDatabaseQuery,
  MaterialDatabaseSource,
  MaterialImpactMetrics,
  MaterialImpactRecord,
} from './material-database.types';
import { localMaterialCache, materialSources } from './material-sources';

@Injectable()
export class MaterialDatabaseService {
  getSources(): MaterialDatabaseSource[] {
    return materialSources;
  }

  async searchMaterials(
    query: MaterialDatabaseQuery,
  ): Promise<{
    items: MaterialImpactRecord[];
    sources: MaterialDatabaseSource[];
    mode: 'verified_api_with_cache' | 'local_cache_fallback';
    note: string;
  }> {
    const apiItems = await this.searchOpenEpd(query);
    const sourceItems = apiItems.length > 0 ? apiItems : localMaterialCache;
    const normalizedQuery = query.q?.trim().toLowerCase();

    const filtered = sourceItems.filter((material) => {
      const sectionMatch =
        !query.section || material.section === query.section;
      const textMatch =
        !normalizedQuery ||
        [
          material.name,
          material.category,
          material.section,
          material.usualMaterial,
          material.manufacturer,
          material.region,
          material.certifications.join(' '),
          material.specSheet.application,
          material.specSheet.composition,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return sectionMatch && textMatch;
    });

    const limit = query.limit && query.limit > 0 ? query.limit : 100;

    return {
      items: filtered.slice(0, limit).map((material) =>
        this.withImpactMetrics(material),
      ),
      sources: materialSources,
      mode:
        apiItems.length > 0 ? 'verified_api_with_cache' : 'local_cache_fallback',
      note:
        apiItems.length > 0
          ? 'Results include API-backed EPD records. Cache these records locally for fast architect search.'
          : 'OpenEPD/EC3 API credentials are not configured, so the app is using the local curated fallback cache.',
    };
  }

  getMaterial(id: string): MaterialImpactRecord | null {
    const material =
      localMaterialCache.find((cacheItem) => cacheItem.id === id) ?? null;

    return material ? this.withImpactMetrics(material) : null;
  }

  private async searchOpenEpd(
    query: MaterialDatabaseQuery,
  ): Promise<MaterialImpactRecord[]> {
    const token = process.env.OPENEPD_API_TOKEN;
    const baseUrl =
      process.env.OPENEPD_API_BASE_URL ??
      'https://openepd.buildingtransparency.org/api';

    if (!token) {
      return [];
    }

    try {
      const omfQuery = this.buildOpenMaterialFilterQuery(query);
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/epds`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: omfQuery,
          page_size: query.limit && query.limit > 0 ? query.limit : 50,
        }),
      });

      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as unknown;
      return this.normalizeOpenEpdRecords(data);
    } catch {
      return [];
    }
  }

  private buildOpenMaterialFilterQuery(query: MaterialDatabaseQuery): string {
    const searchText =
      query.q?.trim() || this.sectionToOpenEpdSearchTerm(query.section);

    const searchClause = searchText
      ? `!EC3 search("${this.escapeOpenMaterialFilterText(searchText)}")`
      : '!EC3 search("")';

    return `${searchClause} !pragma oMF("1.0/1")`;
  }

  private sectionToOpenEpdSearchTerm(section?: string): string {
    const terms: Record<string, string> = {
      Foundation: 'ReadyMix concrete cement aggregate',
      Walls: 'brick masonry block gypsum sheathing',
      Roof: 'roofing membrane insulation metal roof',
      Flooring: 'flooring carpet tile wood bamboo',
      Insulation: 'insulation cellulose mineral wool foam',
      Paint: 'paint coating low VOC',
      Windows: 'window glazing curtain wall',
      Kitchen: 'countertop cabinet panel stainless steel',
      Bathroom: 'ceramic tile plumbing fixture',
    };

    return section ? (terms[section] ?? section) : '';
  }

  private escapeOpenMaterialFilterText(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  private normalizeOpenEpdRecords(data: unknown): MaterialImpactRecord[] {
    const records = this.extractOpenEpdArray(data);

    if (!records.length) {
      return [];
    }

    return records
      .map((item): MaterialImpactRecord | null => {
        if (!item || typeof item !== 'object') {
          return null;
        }

        const record = item as Record<string, any>;
        const id = String(record.id ?? record.openepd_id ?? '');
        const name = String(
          record.product_name ??
            record.name ??
            record.product_description ??
            '',
        );

        if (!id || !name) {
          return null;
        }

        const gwp = this.extractGwpA1A3(record);
        const category = this.extractCategory(record);
        const section = this.categoryToSection(category);
        const manufacturer = this.extractOrgName(record.manufacturer);
        const region = this.extractRegion(record);
        const declaredUnit = String(
          record.declared_unit ??
            record.declared_unit_qty?.unit ??
            record.declared_unit_qty ??
            '',
        );

        return this.withImpactMetrics({
          id,
          section,
          name,
          category,
          usualMaterial: 'Conventional product in same category',
          manufacturer,
          region,
          declaredUnit: declaredUnit || undefined,
          gwpA1A3: gwp
            ? {
                value: gwp.value,
                unit: gwp.unit,
                source: 'openepd_ec3',
              }
            : undefined,
          sustainabilityScore: this.scoreOpenEpdRecord(record, gwp?.value),
          certifications: ['OpenEPD', 'EPD'],
          healthAndCircularity: {
            lowVoc: this.hasLowVocSignal(record),
            bioBased: this.hasBioBasedSignal(record),
            recyclable: this.hasRecyclableSignal(record),
            reusePotential: 'medium',
          },
          specSheet: {
            application: String(
              record.product_description ??
                record.description ??
                'See OpenEPD record.',
            ),
            composition: this.extractComposition(record),
            performanceNotes:
              'Imported from OpenEPD/EC3. Verify declared unit, product category, region, and scope before comparing.',
            tradeoffs:
              'Product-specific comparisons require matching function, declared unit, region, and performance requirements.',
          },
          shopLinks: [
            {
              label: 'View in EC3',
              url: `https://buildingtransparency.org/epds/${id}`,
              region: 'Building Transparency',
            },
          ],
          sourceIds: ['openepd_ec3'],
        });
      })
      .filter((item): item is MaterialImpactRecord => Boolean(item));
  }

  private withImpactMetrics(
    material: MaterialImpactRecord,
  ): MaterialImpactRecord {
    return {
      ...material,
      metrics: material.metrics ?? this.deriveImpactMetrics(material),
    };
  }

  private deriveImpactMetrics(
    material: MaterialImpactRecord,
  ): MaterialImpactMetrics {
    const intensity = material.gwpA1A3 ?? {
      value: this.defaultIntensityForSection(material.section),
      unit: this.defaultUnitForSection(material.section),
      source: 'ice_fallback' as const,
    };
    const baselineValue = Math.round(intensity.value * 1.45);
    const quantity = this.defaultQuantityForSection(material.section);
    const recommendedKgCO2e = Math.round(intensity.value * quantity.value);
    const baselineKgCO2e = Math.round(baselineValue * quantity.value);
    const savingsKgCO2e = Math.max(
      0,
      baselineKgCO2e - recommendedKgCO2e,
    );
    const carbonSavingsPercent =
      baselineKgCO2e > 0
        ? Math.round((savingsKgCO2e / baselineKgCO2e) * 100)
        : 0;

    return {
      carbonIntensity: intensity,
      baselineCarbonIntensity: {
        value: baselineValue,
        unit: intensity.unit,
        material: material.usualMaterial,
      },
      carbonSavingsPercent,
      defaultQuantity: quantity,
      estimatedProjectImpact: {
        recommendedKgCO2e,
        baselineKgCO2e,
        savingsKgCO2e,
      },
      impactBreakdown: [
        {
          stage: 'A1-A3',
          label: 'Product manufacturing',
          percent: 72,
        },
        {
          stage: 'A4',
          label: 'Transport to site',
          percent: 10,
        },
        {
          stage: 'B',
          label: 'Use, repair, maintenance',
          percent: 12,
        },
        {
          stage: 'C',
          label: 'End of life',
          percent: 6,
        },
      ],
      costCarbonModel: {
        relativeCost:
          material.sustainabilityScore >= 90
            ? 'higher'
            : material.sustainabilityScore >= 80
              ? 'similar'
              : 'varies',
        carbonValueNote:
          'Use this as an early design carbon-cost model. Replace default quantities with project takeoff quantities for accurate comparison.',
      },
      comparableDesignOptions: [
        material.name,
        material.usualMaterial,
        `${material.section} option with verified product EPD`,
      ],
    };
  }

  private defaultIntensityForSection(
    section: MaterialImpactRecord['section'],
  ): number {
    const values: Record<MaterialImpactRecord['section'], number> = {
      Foundation: 240,
      Walls: 85,
      Roof: 18,
      Flooring: 12,
      Insulation: 8,
      Paint: 3,
      Windows: 95,
      Kitchen: 45,
      Bathroom: 24,
    };

    return values[section];
  }

  private defaultUnitForSection(
    section: MaterialImpactRecord['section'],
  ): string {
    return section === 'Foundation' || section === 'Walls'
      ? 'kgCO2e/m3'
      : 'kgCO2e/m2';
  }

  private defaultQuantityForSection(
    section: MaterialImpactRecord['section'],
  ): MaterialImpactMetrics['defaultQuantity'] {
    const quantities: Record<
      MaterialImpactRecord['section'],
      MaterialImpactMetrics['defaultQuantity']
    > = {
      Foundation: {
        value: 12,
        unit: 'm3',
        note: 'Example small residential slab/foundation quantity.',
      },
      Walls: {
        value: 35,
        unit: 'm3',
        note: 'Example wall material volume. Replace with wall takeoff.',
      },
      Roof: {
        value: 120,
        unit: 'm2',
        note: 'Example roof area.',
      },
      Flooring: {
        value: 100,
        unit: 'm2',
        note: 'Example interior floor area.',
      },
      Insulation: {
        value: 150,
        unit: 'm2',
        note: 'Example insulated envelope area.',
      },
      Paint: {
        value: 250,
        unit: 'm2',
        note: 'Example interior painted wall and ceiling area.',
      },
      Windows: {
        value: 28,
        unit: 'm2',
        note: 'Example glazing area.',
      },
      Kitchen: {
        value: 12,
        unit: 'm2',
        note: 'Example cabinet/counter surface area.',
      },
      Bathroom: {
        value: 35,
        unit: 'm2',
        note: 'Example bathroom wall and floor finish area.',
      },
    };

    return quantities[section];
  }

  private extractOpenEpdArray(data: unknown): unknown[] {
    if (Array.isArray(data)) {
      return data;
    }

    if (!data || typeof data !== 'object') {
      return [];
    }

    const record = data as Record<string, unknown>;
    const candidates = [
      record.items,
      record.results,
      record.data,
      record.epds,
      record.declarations,
    ];

    const match = candidates.find(Array.isArray);
    return Array.isArray(match) ? match : [];
  }

  private extractGwpA1A3(
    record: Record<string, any>,
  ): { value: number; unit: string } | null {
    const candidates = [
      record.impacts?.gwp?.a1a3,
      record.impacts?.gwp?.A1A3,
      record.impacts?.gwp,
      record.gwp?.a1a3,
      record.gwp,
      record.gwp_a1a3,
    ];

    for (const candidate of candidates) {
      if (typeof candidate === 'number') {
        return { value: candidate, unit: 'kgCO2e' };
      }

      if (candidate && typeof candidate === 'object') {
        const value = Number(
          candidate.mean ??
            candidate.value ??
            candidate.quantity ??
            candidate.result ??
            candidate.amount,
        );

        if (Number.isFinite(value)) {
          return {
            value,
            unit: String(candidate.unit ?? candidate.units ?? 'kgCO2e'),
          };
        }
      }
    }

    return null;
  }

  private extractCategory(record: Record<string, any>): string {
    const productClass = Array.isArray(record.product_classes)
      ? record.product_classes[0]
      : undefined;

    return String(
      productClass?.name ??
        productClass?.display_name ??
        productClass?.code ??
        record.product_category ??
        record.category ??
        'EPD product',
    );
  }

  private categoryToSection(category: string): MaterialImpactRecord['section'] {
    const normalized = category.toLowerCase();

    if (normalized.includes('concrete') || normalized.includes('cement')) {
      return 'Foundation';
    }
    if (
      normalized.includes('masonry') ||
      normalized.includes('brick') ||
      normalized.includes('gypsum') ||
      normalized.includes('board')
    ) {
      return 'Walls';
    }
    if (normalized.includes('roof')) return 'Roof';
    if (normalized.includes('floor') || normalized.includes('carpet')) {
      return 'Flooring';
    }
    if (normalized.includes('insulation')) return 'Insulation';
    if (normalized.includes('paint') || normalized.includes('coating')) {
      return 'Paint';
    }
    if (normalized.includes('window') || normalized.includes('glazing')) {
      return 'Windows';
    }
    if (normalized.includes('counter') || normalized.includes('cabinet')) {
      return 'Kitchen';
    }
    if (normalized.includes('tile') || normalized.includes('plumbing')) {
      return 'Bathroom';
    }

    return 'Walls';
  }

  private extractOrgName(org: unknown): string | undefined {
    if (!org) return undefined;
    if (typeof org === 'string') return org;
    if (typeof org === 'object') {
      const record = org as Record<string, unknown>;
      return String(record.name ?? record.web_domain ?? '') || undefined;
    }
    return undefined;
  }

  private extractRegion(record: Record<string, any>): string | undefined {
    const plant = Array.isArray(record.plants) ? record.plants[0] : undefined;
    const value =
      record.region ??
      record.geography ??
      record.location ??
      record.plant_or_group?.location ??
      plant?.location ??
      plant?.address;

    return value ? String(value) : undefined;
  }

  private extractComposition(record: Record<string, any>): string {
    return String(
      record.product_description ??
        record.product_specs ??
        record.material_specs ??
        'See OpenEPD product declaration for composition and PCR details.',
    );
  }

  private scoreOpenEpdRecord(
    record: Record<string, any>,
    gwpValue?: number,
  ): number {
    let score = 72;
    const text = JSON.stringify(record).toLowerCase();

    if (gwpValue !== undefined && gwpValue < 50) score += 10;
    if (gwpValue !== undefined && gwpValue > 300) score -= 8;
    if (text.includes('recycled')) score += 6;
    if (text.includes('low voc') || text.includes('low-voc')) score += 5;
    if (text.includes('fsc') || text.includes('bio')) score += 4;

    return Math.max(40, Math.min(96, score));
  }

  private hasLowVocSignal(record: Record<string, any>): boolean {
    const text = JSON.stringify(record).toLowerCase();
    return text.includes('low voc') || text.includes('low-voc');
  }

  private hasBioBasedSignal(record: Record<string, any>): boolean {
    const text = JSON.stringify(record).toLowerCase();
    return (
      text.includes('bio-based') ||
      text.includes('biobased') ||
      text.includes('wood') ||
      text.includes('bamboo') ||
      text.includes('cellulose')
    );
  }

  private hasRecyclableSignal(record: Record<string, any>): boolean {
    const text = JSON.stringify(record).toLowerCase();
    return text.includes('recycl') || text.includes('reuse');
  }
}
