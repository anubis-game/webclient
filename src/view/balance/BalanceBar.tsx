import { ShowBalances } from "./ShowBalances";
import { TokenStore } from "../../func/token/TokenStore";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const BalanceBar = () => {
  const { available } = TokenStore(
    useShallow((state) => ({
      available: state.available,
    })),
  );

  const { connected } = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  const avl = TokenStore.getState().formatBalance(available);

  if (!connected || !avl) {
    return <></>;
  }

  return (
    <div className="absolute bottom-4 left-4 flex gap-4 items-center">
      <ShowBalances />
    </div>
  );
};
