import React, { useState, useEffect } from "react";
import { Message, msgPipe } from "./data";

import "./MsgBox.css";

export const MsgBox: React.FC = () => {
  const [msgs, pushMsg] = useState<Message[]>([]);

  useEffect(() => {
    const subscription = msgPipe.subscribe((msg) => {
      pushMsg((msgs) => [...msgs, msg]);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="msg-box" style={{ maxHeight: 600, overflowY: "auto" }}>
      {msgs.map((msg) => (
        <div key={msg.id} className="msg-block">
          {msg.id + 1} - {msg.content}
        </div>
      ))}
    </div>
  );
};
