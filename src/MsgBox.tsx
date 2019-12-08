import React, { useState } from "react";
import { Message, msgPipe } from "./data";

export const MsgBox: React.FC = () => {
  const [msgs, pushMsg] = useState<Message[]>([]);

  // ! 这里有问题
  // TODO
  msgPipe.subscribe((msg) => {
    console.log(msgs)
    pushMsg([msg, ...msgs].slice(0, 20));
  });

  return (
    <div className="msg-box">
      this is msg box, current id is{}
      {msgs.map((msg) => (
        <div key={msg.id}>
          {msg.id} - {msg.content}
        </div>
      ))}
    </div>
  );
};
