import { ActivityIcon } from "../icon/ActivityIcon";
import { BalanceStatusLoading } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DollarIcon } from "../icon/DollarIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { WalletStatusConnected } from "../../func/wallet/WalletStatus";

export const BalanceBar = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      allocated: state.allocated,
      available: state.available,
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

  const alo = balance.allocated.balance.toFixed(balance.allocated.precision);
  const avl = balance.available.balance.toFixed(balance.available.precision);

  return (
    <div className="absolute bottom-6 left-6 flex gap-4 items-center">
      <Tooltip
        content={<>Available Balance</>}
        side="top"
        trigger={<DollarIcon />}
      />
      <div>{avl}</div>

      <Tooltip
        content={<>Allocated Balance</>}
        side="top"
        trigger={<ActivityIcon />}
      />
      <div>{alo}</div>
    </div>
  );
};
