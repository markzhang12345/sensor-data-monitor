import React from "react";
import mqtt from "mqtt";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [depth, setDepth] = useState(0);

  const fetchState = () => {
    axios
      .get("http://localhost:5000/states/nowstate")
      .then((res) => {
        const {
          temperature: nowTemperature,
          pressure: nowPressure,
          depth: nowDepth,
        } = res.data;
        setTemperature(nowTemperature);
        setPressure(nowPressure);
        setDepth(nowDepth);
      })
      .catch((err) => {
        console.log("Error getting nowstate:", err);
      });
  };

  useEffect(() => {
    fetchState();

    const interval = setInterval(fetchState, 10000);

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

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
