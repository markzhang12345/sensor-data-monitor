import React, { useReducer } from "react";
import { HistoryProp } from "../Types/Types.ts";

const Home: React.FC<HistoryProp> = ({ taskStates }) => {
  const nowState = taskStates[0];
  console.log("Current sensor state:", nowState);

  return (
    <div>
      <h1>Sensor Data</h1>
      <p>Temperature: {nowState.temperature} °C</p>
      <p>Pressure: {nowState.pressure} kPa</p>
      <p>Depth: {nowState.depth} m</p>
    </div>
  );
};

export default Home;
