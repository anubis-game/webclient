import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Props {
  disabled: boolean;
  onSelect: (val: string) => void;
  selected: string;
  values: string[];
}

export const SymbolToggle = (props: Props) => {
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
        <ToggleGroup.Item
          key={x}
          className="button outline w-16 px-2 py-1"
          value={x}
        >
          {x}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
