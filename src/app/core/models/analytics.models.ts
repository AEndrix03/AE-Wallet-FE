export interface PortfolioDeviationData {
  portfolioId: string;
  name: string;
  color: string; // Per il grafico
  targetAllocation: number; // % target fisso
  monthlyData: MonthlyDeviation[];
  statistics: PortfolioStats;
}

export interface MonthlyDeviation {
  month: string; // 'YYYY-MM'
  date: Date;
  actualAllocation: number; // % effettiva del mese
  targetAllocation: number; // % target (fisso)
  deviationPercentage: number; // Calculated: ((actual - target) / target) * 100
  absoluteDeviation: number; // |deviationPercentage|
}

export interface PortfolioStats {
  averageDeviation: number;
  maxDeviation: number;
  minDeviation: number;
  trend: 'improving' | 'worsening' | 'stable';
  rating: number;
  rank: number;
}
