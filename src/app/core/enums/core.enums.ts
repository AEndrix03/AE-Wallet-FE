export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
} as const;

export type Currency = keyof typeof CURRENCY_SYMBOLS;
