import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Message, msgPipe } from "./data";

import { Subject } from "rxjs";
import { MeasuredMsg } from "./MsgBox";

export const Measurer: React.FC<{
  measuredPipe: Subject<MeasuredMsg>;
}> = ({ measuredPipe }) => {
  // msg是管道中传来的数据，渲染之后获得高度
  const [msg, setMsg] = useState<Message | null>(null);

  useEffect(() => {
    // 订阅数据来源
    const subscription = msgPipe.subscribe(msg => {
      setMsg(msg);
    });
    return () => {
      // 该组件下线的时候退出订阅
      subscription.unsubscribe();
    };
  }, []);

  // 创建一个获取dom节点的ref
  const domRef = useRef<null | HTMLDivElement>(null);

  // 节点渲染完成就可以获得高度
  useLayoutEffect(() => {
    const domElement = domRef.current;
    if (domElement && msg) {
      const measuredMsg: MeasuredMsg = {
        ...msg,
        height: domElement.clientHeight
      };

      // 将消息带上自己的高度传递出去
      measuredPipe.next(measuredMsg);
    }
  });

  return (
    msg && (
      <div className="msg-block hide-msgs" ref={domRef}>
        {msg.id + 1} - {msg.content}
      </div>
    )
  );
};
