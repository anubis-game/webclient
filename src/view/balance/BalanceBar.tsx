import { ActivityIcon } from "../icon/ActivityIcon";
import { DollarIcon } from "../icon/DollarIcon";
import { TokenStore } from "../../func/token/TokenStore";
import { Tooltip } from "../tooltip/Tooltip";
import { useShallow } from "zustand/react/shallow";

// T is the currently hard coded default token.
const T = "USDC";

export const BalanceBar = () => {
  const { available, allocated } = TokenStore(
    useShallow((state) => ({
      available: state.available,
      allocated: state.allocated,
    })),
  );

  const alo = allocated[T] ? allocated[T].balance.toFixed(allocated[T].precision) : "";
  const avl = available[T] ? available[T].balance.toFixed(available[T].precision) : "";

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
