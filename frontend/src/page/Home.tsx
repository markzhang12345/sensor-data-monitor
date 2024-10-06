import React from "react";
import { HomeProps } from "../Types/Types";

const Home: React.FC<HomeProps> = ({ nowState }) => {
  const { temperature, pressure, depth } = nowState;

  return (
    <div>
      <h1>Sensor Data</h1>
      <p>Temperature: {temperature} °C</p>
      <p>Pressure: {pressure} kPa</p>
      <p>Depth: {depth} m</p>
    </div>
  );
};

export default Home;
