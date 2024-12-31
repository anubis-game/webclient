import { ActivityIcon } from "../icon/ActivityIcon";
import { BalanceStatusLoading } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DollarIcon } from "../icon/DollarIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { useShallow } from "zustand/react/shallow";
import { WalletStatusConnected } from "../../func/wallet/WalletStatus";
import { WalletStore } from "../../func/wallet/WalletStore";

export const BalanceBar = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      allocated: state.allocated,
      deposited: state.deposited,
      precision: state.precision,
      status: state.status,
    })),
  );

  const wallet = WalletStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (wallet.status !== WalletStatusConnected || balance.status === BalanceStatusLoading) {
    return <></>;
  }

  const alo = balance.allocated.toFixed(balance.precision);
  const dep = balance.deposited.toFixed(balance.precision);

  return (
    <div className="absolute bottom-6 left-6 flex gap-4 items-center">
      <Tooltip
        content={<>Deposited Balance</>}
        side="top"
        trigger={<DollarIcon />}
      />
      <div>{dep}</div>

      <Tooltip
        content={<>Allocated Balance</>}
        side="top"
        trigger={<ActivityIcon />}
      />
      <div>{alo}</div>
    </div>
  );
};
