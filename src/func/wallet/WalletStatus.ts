export const WalletStatusConnected = "connected";
export const WalletStatusDisconnected = "disconnected";
export const WalletStatusLoading = "loading";

export type WalletStatus = typeof WalletStatusConnected | typeof WalletStatusDisconnected | typeof WalletStatusLoading;
