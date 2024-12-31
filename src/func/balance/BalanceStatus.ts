export const BalanceStatusEmpty = "empty";
export const BalanceStatusFunded = "funded";
export const BalanceStatusLoading = "loading";

export type BalanceStatus = typeof BalanceStatusEmpty | typeof BalanceStatusFunded | typeof BalanceStatusLoading;
