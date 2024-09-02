export interface WalletsState {
  allWallets: WalletDto[];
  selectedWallet: WalletDto | null;
  patchedWallet: WalletDto | null;
  loading: boolean;
}

export interface WalletDto {
  id: number;
  name: string;
  description: string;
  headerColor: string;
  headerBackgroundColor: string;
}
