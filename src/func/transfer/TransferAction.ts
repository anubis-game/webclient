export const TransferActionDeposit = "deposit";
export const TransferActionWithdraw = "withdraw";

export type TransferAction = typeof TransferActionDeposit | typeof TransferActionWithdraw;
