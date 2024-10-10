import React, { useEffect } from "react";
import { HistoryProp } from "../Types/Types.ts";
import { Button } from "antd";
import axios from "axios";

const Home: React.FC<HistoryProp> = ({ taskStates }) => {
  const nowState = taskStates[0];
  useEffect(() => {
    // const handleKeyDown = (event: KeyboardEvent) => {
    //   switch (event.key) {
    //     case "w":
    //     case "W":
    //       document.getElementById("button-w")?.click();
    //       break;
    //     case "a":
    //     case "A":
    //       document.getElementById("button-a")?.click();
    //       break;
    //     case "s":
    //     case "S":
    //       document.getElementById("button-s")?.click();
    //       break;
    //     case "d":
    //     case "D":
    //       document.getElementById("button-d")?.click();
    //       break;
    //     default:
    //       break;
    //   }
    // };
    // window.addEventListener("keydown", handleKeyDown);
    // return () => {
    //   window.removeEventListener("keydown", handleKeyDown);
    // };

    const handleKeyDown = (event: KeyboardEvent) => {
      let newCommend: string | undefined;
      switch (event.key) {
        case "w":
        case "W":
          newCommend = "advance";
          document.getElementById("button-w")?.click();
          break;
        case "a":
        case "A":
          newCommend = "left";
          document.getElementById("button-a")?.click();
          break;
        case "s":
        case "S":
          newCommend = "back";
          document.getElementById("button-s")?.click();
          break;
        case "d":
        case "D":
          newCommend = "right";
          document.getElementById("button-d")?.click();
          break;
        default:
          break;
      }
      if (newCommend)
        axios
          .post("http://localhost:5000/action", { commend: newCommend })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    };
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div>
        <h1>Sensor Data</h1>
        <p>Temperature: {nowState.temperature} °C</p>
        <p>Pressure: {nowState.pressure} kPa</p>
        <p>Depth: {nowState.depth} m</p>
      </div>
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Control</h1>
        <Button
          id="button-w"
          type="primary"
          style={{ marginBottom: 10, marginLeft: 56 }}
        >
          W
        </Button>
        <div style={{ display: "flex" }}>
          <Button id="button-a" type="primary" style={{ marginLeft: 10 }}>
            A
          </Button>
          <Button id="button-s" type="primary" style={{ marginLeft: 10 }}>
            S
          </Button>
          <Button id="button-d" type="primary" style={{ marginLeft: 10 }}>
            D
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
