import React, { useState, useEffect } from "react";
import { MeasuredMsg } from "./MsgBox";
import { Subject } from "rxjs";

export const MsgShow: React.FC<{
  measuredPipe: Subject<MeasuredMsg>;
}> = ({ measuredPipe }) => {
  const [msgs, setMsgs] = useState<MeasuredMsg[]>([]);

  useEffect(() => {
    measuredPipe.subscribe(msg => {
      setMsgs(msgs => [...msgs, msg]);
    });
    return () => {
      // 该组件下线的时候关闭掉自己生成的管道
      measuredPipe.unsubscribe();
    };
  }, [measuredPipe]);

  return (
    <>
      {msgs.map(msg => (
        <div
          className="msg-block"
          key={msg.id}
          style={{ height: msg.height + "px" }}
        >
          {msg.id + 1} - {msg.content}
        </div>
      ))}
    </>
  );
};
