import React, { useState, useEffect } from "react";
import { Message } from "./data";

import "./MsgBox.css";
import { Subject } from "rxjs";
import { Measurer } from "./Measurer";
import { MsgShow } from "./MsgShow";

export type MeasuredMsg = Message & { height: number };

export const MsgBox: React.FC = () => {
  // 计算出了高度的msg放进measuredPipe中向下传递
  // measuredPipe归本组件管理，用于应对页面上有多个相同组件的情况
  const [measuredPipe, setMeasurePipe] = useState<Subject<MeasuredMsg> | null>(
    null
  );

  useEffect(() => {
    const pipe = new Subject<MeasuredMsg>();
    setMeasurePipe(pipe);
    return () => {
      // 该组件下线的时候关闭掉自己生成的管道
      pipe.complete();
    };
  }, []);

  return (
    measuredPipe && (
      <div className="msg-box" style={{ maxHeight: 600, overflowY: "auto" }}>
        <Measurer measuredPipe={measuredPipe} />
        <MsgShow measuredPipe={measuredPipe} />
      </div>
    )
  );
};
