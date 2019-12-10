import Chance from "chance";
import { Subject } from "rxjs";
const chance = new Chance();

export interface Message {
  id: number;
  content: string;
}

export const MSG_COUNT = 999;
export const TIME_INTERVAL = 1000;

// test messages
export const messages: Message[] = Array(MSG_COUNT)
  .fill(undefined)
  // generate random sentence
  .map((_, index) => ({ id: index, content: chance.sentence() }));

export const msgPipe = new Subject<Message>();
