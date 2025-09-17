import { PortfolioTypeEnum } from '../enums/portfolio.enums';

export interface PortfolioDto {
  id: string;
  name: string;
  type: PortfolioTypeEnum;
  balance: number;
  target?: number;
  image?: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  lastUpdated: Date;
}
