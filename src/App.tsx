import React from "react";

import "./App.css";
import { MsgBox } from "./MsgBox";
import { msgPipe, messages, MSG_COUNT, TIME_INTERVAL } from "./data";

let tickGenerator = 0;

const App: React.FC = () => {
  if (tickGenerator) {
    clearInterval(tickGenerator);
  }
  let index = 0;
  setInterval((_) => {
    msgPipe.next(messages[index]);
    index++;
    if (index >= MSG_COUNT) {
      clearInterval(tickGenerator);
    }
  }, TIME_INTERVAL);

  return (
    <div className="App">
      <MsgBox />
    </div>
  );
};

export default App;
