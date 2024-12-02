import * as React from "react";

import { StreamStore } from "../../func/stream/StreamStore";
import { useShallow } from "zustand/react/shallow";

export const Message = () => {
  const { connected } = StreamStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (connected) {
      StreamStore.getState().client?.recv((str: string) => {
        setMessages((prev) => [...prev, str]);
      });
    }
  }, [connected]);

  return (
    <>
      <input
        className="bg-gray-200"
        type="text"
        onKeyDown={(e) => {
          if (connected && e.key === "Enter") {
            StreamStore.getState().client?.send(
              (e.target as HTMLInputElement).value,
            );
          }
        }}
      />
      {connected ? <>connected</> : <>connecting</>}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};
