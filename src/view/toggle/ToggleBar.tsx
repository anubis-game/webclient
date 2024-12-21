import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ToggleItem } from "./ToggleItem";

interface Props {
  default: string;
  disabled: boolean;
  onSelect: (val: string) => void;
  selected: string;
  values: string[];
}

export const ToggleBar = (props: Props) => {
  return (
    <ToggleGroup.Root
      className="flex gap-2"
      type="single"
      defaultValue={props.selected}
      disabled={props.disabled}
      value={props.selected}
      onValueChange={(value: string) => {
        // Ensure that values can only be set, but not unset. This ensures we
        // always have a single mandatory value selected.
        if (value) {
          props.onSelect(value);
        }
      }}
      rovingFocus={false}
    >
      {props.values.map((x: string) => (
        <ToggleItem
          key={x}
          value={x}
        />
      ))}
    </ToggleGroup.Root>
  );
};
