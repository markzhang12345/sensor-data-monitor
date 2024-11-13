export interface State {
  temperature: number;
  pressure: number;
  depth: number;
  time: string; // 用字符串类型来存储时间
}

export interface HistoryProp {
  taskStates: State[];
}

export type StateAction = { type: "update"; payload: State[] };

export interface Action {
  commend: string;
  time: string;
}
