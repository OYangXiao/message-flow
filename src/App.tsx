import React, { useEffect } from "react";

import "./App.css";
import { MsgBox } from "./MsgBox";
import { msgPipe, messages, MSG_COUNT, TIME_INTERVAL } from "./data";

const App: React.FC = () => {
  // app中启动定时器，向数据管道中发送数据
  useEffect(() => {
    let index = 0;
    let tickGenerator: number;
    tickGenerator = window.setInterval(() => {
      msgPipe.next(messages[index]);
      index++;
      if (index >= MSG_COUNT) {
        clearInterval(tickGenerator);
      }
    }, TIME_INTERVAL);
    return () => {
      clearInterval(tickGenerator);
    };
  }, []);

  return (
    <div className="App">
      <MsgBox />
    </div>
  );
};

export default App;
