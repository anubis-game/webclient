import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Address } from "viem";
import { GuardianObject } from "../../func/guardian/GuardianObject";

interface Props {
  onSelect: (val: Address) => void;
  selected: Address;
  values: GuardianObject[];
}

export const ActiveToggle = (props: Props) => {
  return (
    <ToggleGroup.Root
      className="grid grid-cols-2 gap-4"
      type="single"
      defaultValue={props.selected}
      value={props.selected}
      onValueChange={(value: string) => {
        // Ensure that values can only be set, but not unset. This ensures we
        // always have a single mandatory value selected.
        if (value) {
          props.onSelect(value as Address);
        }
      }}
      rovingFocus={false}
    >
      {props.values.map((x: GuardianObject) => (
        <ToggleGroup.Item
          key={x.address}
          className="button outline p-4"
          value={x.address}
        >
          <div className="w-full flex justify-between">
            <div>{x.address.slice(0, 6)}</div>
            <div>{Math.round(x.latency)} ms</div>
          </div>
        </ToggleGroup.Item>
      ))}

      {Array.from({ length: Math.max(4 - props.values.length, 0) }).map((_, i) => (
        <ToggleGroup.Item
          key={`skeleton-${i}`}
          className="button solid disabled p-4"
          disabled={true}
          value=""
        >
          More Games Soon
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
