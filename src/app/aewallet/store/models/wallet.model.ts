export interface WalletsState {
  allWallets: WalletDto[];
  selectedWallet: WalletDto | null;
  patchedWallet: WalletDto | null;
  loading: boolean;
  selectedEntries: EntryDto[];
  filteredEntries: EntryDto[];
  entriesFilter: EntryFilterDto;
  balance: number;
}

export interface WalletDto {
  id: number;
  name: string;
  description: string;
  headerColor: string;
  headerBackgroundColor: string;
}

export interface WalletCreateDto {
  name: string;
  description: string;
  headerColor: string;
  headerBackgroundColor: string;
}

export interface WalletUpdateDto extends WalletCreateDto {
  id: number;
}

export interface EntryDto {
  id: number;
  value: number;
  title: string;
  description: string;
  date: Date;
  walletId: number;
}

export interface EntryFilterDto {
  title?: string;
  description?: string;
  dateFrom?: Date;
  dateTo?: Date;
  valueFrom?: number;
  valueTo?: number;
  walletId?: number;
}
