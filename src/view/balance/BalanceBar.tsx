import { ActivityIcon } from "../icon/ActivityIcon";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DollarIcon } from "../icon/DollarIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const BalanceBar = () => {
  const { allocated, available } = BalanceStore(
    useShallow((state) => ({
      allocated: state.allocated,
      available: state.available,
    })),
  );

  const { connected } = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  const alo = BalanceStore.getState().formatBalance(allocated);
  const avl = BalanceStore.getState().formatBalance(available);

  if (!connected || !avl) {
    return <></>;
  }

  return (
    <div className="absolute bottom-4 left-4 flex gap-4 items-center">
      {avl && (
        <>
          <Tooltip
            content={<>Available Balance</>}
            side="top"
            trigger={<DollarIcon />}
          />
          <>{avl}</>
        </>
      )}

      {alo && (
        <>
          <Tooltip
            content={<>Allocated Balance</>}
            side="top"
            trigger={<ActivityIcon />}
          />
          <>{alo}</>
        </>
      )}
    </div>
  );
};
