import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Props {
  value: string;
}

export const ToggleItem = (props: Props) => {
  return (
    <ToggleGroup.Item
      className="button outline w-16 px-2 py-1"
      value={props.value}
    >
      {props.value}
    </ToggleGroup.Item>
  );
};
