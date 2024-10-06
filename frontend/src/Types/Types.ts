export interface State {
  temperature: number;
  pressure: number;
  depth: number;
  time: string; // 用字符串类型来存储时间
}

export interface HomeProps {
  nowState: State;
  setNowState: React.Dispatch<React.SetStateAction<State>>;
}

export interface HistoryProps {
  setNowState: React.Dispatch<React.SetStateAction<State>>;
}
