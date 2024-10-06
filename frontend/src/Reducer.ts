import { State, StateAction } from "./Types/Types";

export const initialState: State = {
  temperature: 0,
  pressure: 0,
  depth: 0,
  time: new Date().toISOString(),
};

export const initialStates: State[] = [initialState];

export const stateReducer = (state: State[], action: StateAction): State[] => {
  switch (action.type) {
    case "update":
      return action.payload;

    default:
      return state;
  }
};
