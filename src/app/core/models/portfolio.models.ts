import {
  PortfolioStatusEnum,
  PortfolioTypeEnum,
} from '../enums/portfolio.enums';

export interface PortfolioDto {
  id: string;
  name: string;
  type: PortfolioTypeEnum;
  balance: number;
  target?: number;
  image?: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  lastUpdated: Date;
  color: string;
}

export interface PortfolioTypeDto {
  code: PortfolioTypeEnum;
  description: string;
}

export interface PortfolioStatusDto {
  code: PortfolioStatusEnum;
  description: string;
}

export interface PortfolioSaveDto extends PortfolioDto {
  userId: string;
}
