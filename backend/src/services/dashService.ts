import { AppDataSource } from '../db/datasource';
import { Logistics } from '../controllers/entity';

const BASELINE_LOSS_RATE = 0.3253;

function safeNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined) return fallback;
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

export interface CorridorLeaderboardItem {
  originState: string;
  destinationState: string;
  avgDelayHours: number;
  avgTempC: number;
}

export interface SeasonalityTrendItem {
  season: string;
  avgPricePerCrate: number;
}

export interface DashboardMetricsPayload {
  kpis: {
    totalFoodSavedKg: number;
    totalRevenueDeliveredNgn: number;
    platformSpoilageRatePercent: number;
  };
  corridorLeaderboard: CorridorLeaderboardItem[];
  seasonalityTrends: SeasonalityTrendItem[];
}

export class DashboardService {
  static async getDashboardSummary(): Promise<DashboardMetricsPayload> {
    const logisticsRepo = AppDataSource.getRepository(Logistics);

    const [
      kpiData,
      revenueData,
      leaderboardData,
      seasonalityData
    ] = await Promise.all([
      
      logisticsRepo.createQueryBuilder('logistics')
        .select([
          `COALESCE(SUM(logistics.quantitySentKg * (${BASELINE_LOSS_RATE} - (logistics.spoilageRatePercent / 100.0))), 0) AS total_food_saved_kg`,
          `COALESCE(AVG(logistics.spoilageRatePercent), 0) AS avg_platform_spoilage_rate`
        ])
        .getRawOne(),

      logisticsRepo.createQueryBuilder('logistics')
        .select('COALESCE(SUM(logistics.deliveredRevenueNgn), 0)', 'total_revenue_delivered_ngn')
        .where('logistics.spoilageStatusLabel = :status', { status: 'Not Spoiled' })
        .getRawOne(),

      logisticsRepo.createQueryBuilder('logistics')
        .select([
          'logistics.originState AS "originState"',
          'logistics.destinationState AS "destinationState"',
          'COALESCE(AVG(logistics.checkpointDelayHours), 0) AS avg_delay_hours',
          'COALESCE(AVG(logistics.averageTemperatureC), 0) AS avg_temp_c'
        ])
        .groupBy('logistics.originState')
        .addGroupBy('logistics.destinationState')
        .orderBy('avg_delay_hours', 'DESC')
        .getRawMany(),

      logisticsRepo.createQueryBuilder('logistics')
        .select([
          'logistics.season AS season',
          'COALESCE(AVG(logistics.pricePerCrateNgn), 0) AS avg_price_per_crate'
        ])
        .groupBy('logistics.season')
        .getRawMany()
    ]);

    return {
      kpis: {
        totalFoodSavedKg: Number(safeNumber(kpiData?.total_food_saved_kg).toFixed(2)),
        totalRevenueDeliveredNgn: Number(safeNumber(revenueData?.total_revenue_delivered_ngn).toFixed(2)),
        platformSpoilageRatePercent: Number(safeNumber(kpiData?.avg_platform_spoilage_rate).toFixed(2)),
      },
      corridorLeaderboard: leaderboardData.map((item) => ({
        originState: item.originState ?? 'Unknown', 
        destinationState: item.destinationState ?? 'Unknown',
        avgDelayHours: Number(safeNumber(item.avg_delay_hours).toFixed(2)),
        avgTempC: Number(safeNumber(item.avg_temp_c).toFixed(2)),
      })),
      seasonalityTrends: seasonalityData.map((item) => ({
        season: item.season ?? 'Unknown',
        avgPricePerCrate: Number(safeNumber(item.avg_price_per_crate).toFixed(2)),
      }))
    };
  }
}