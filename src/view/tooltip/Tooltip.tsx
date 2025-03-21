import * as HoverCard from "@radix-ui/react-hover-card";
import * as React from "react";

interface Props {
  // content is the element that is shown to users when the trigger element
  // executes.
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  // trigger is the element that user hover over or click in order to see the
  // tooltip content.
  trigger: React.ReactNode;
}

export const Tooltip = (props: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCard.Trigger asChild>
        <span
          onTouchStart={() => setOpen(true)}
          onMouseDown={() => setOpen(true)}
        >
          {props.trigger}
        </span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={`
            dialog p-2 max-w-[300px]
            data-[state=open]:transition-all
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=left]:animate-slideRightAndFade
            data-[side=top]:animate-slideDownAndFade
          `}
          side={props.side ? props.side : "top"}
          sideOffset={16}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm">{props.content}</div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
