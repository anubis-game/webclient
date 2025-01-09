import { ConnectWallet } from "./ConnectWallet";
import { ShowWallets } from "./ShowWallets";
import { useShallow } from "zustand/react/shallow";
import { WalletStatus } from "../../func/wallet/WalletStatus";
import { WalletStore } from "../../func/wallet/WalletStore";

export const WalletBar = () => {
  const { status } = WalletStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (status === WalletStatus.Loading) {
    return <></>;
  }

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center">
      {status === WalletStatus.Connected ? <ShowWallets /> : <ConnectWallet />}
    </div>
  );
};
