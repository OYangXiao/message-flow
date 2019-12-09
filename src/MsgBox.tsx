import React, { useState, useEffect } from "react";
import { Message, msgPipe } from "./data";

export const MsgBox: React.FC = () => {
  const [msgs, pushMsg] = useState<Message[]>([]);
  console.log("start", msgs);

  useEffect(() => {
    console.log("use effect", msgs);
    const subscription = msgPipe.subscribe((msg) => {
      console.log("on msg", msgs);
      pushMsg([msg, ...msgs]);
    });
    return () => {
      console.log("unsubscribe");
      subscription.unsubscribe();
    };
  }, [msgs]);
  console.log("before return", msgs);

  return (
    <div className="msg-box">
      this is msg box, current id is{}
      {msgs.map((msg) => (
        <div key={msg.id}>
          {msg.id + 1} - {msg.content}
        </div>
      ))}
    </div>
  );
};
