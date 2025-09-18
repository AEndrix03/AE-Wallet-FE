export enum PortfolioTypeEnum {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
  CRYPTO = 'CRYPTO',
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  PAC = 'PAC',
  EMERGENCY = 'EMERGENCY',
}

export enum PortfolioStatusEnum {
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  INACTIVE = 'INACTIVE',
}

export const PORTFOLIO_TYPE_CONFIG = {
  [PortfolioTypeEnum.CHECKING]: {
    icon: 'pi pi-credit-card',
    label: 'Conto Corrente',
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  [PortfolioTypeEnum.SAVINGS]: {
    icon: 'pi pi-piggy-bank',
    label: 'Risparmi',
    color: 'green',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  [PortfolioTypeEnum.INVESTMENT]: {
    icon: 'pi pi-chart-line',
    label: 'Investimenti',
    color: 'purple',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  [PortfolioTypeEnum.CRYPTO]: {
    icon: 'pi pi-bitcoin',
    label: 'Crypto',
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  [PortfolioTypeEnum.CASH]: {
    icon: 'pi pi-money-bill',
    label: 'Contanti',
    color: 'gray',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
  },
  [PortfolioTypeEnum.CREDIT]: {
    icon: 'pi pi-credit-card',
    label: 'Credito',
    color: 'red',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  [PortfolioTypeEnum.PAC]: {
    icon: 'pi pi-calendar-clock',
    label: 'PAC',
    color: 'indigo',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  [PortfolioTypeEnum.EMERGENCY]: {
    icon: 'pi pi-shield',
    label: 'Emergenza',
    color: 'yellow',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
} as const;
