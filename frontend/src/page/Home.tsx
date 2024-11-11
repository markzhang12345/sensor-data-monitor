import React, { useEffect } from "react";
import { HistoryProp } from "../Types/Types.ts";
import { Button } from "antd";
import axios from "axios";

const Home: React.FC<HistoryProp> = ({ taskStates }) => {
  const nowState = taskStates[0];
  let wDown: boolean = false;
  let sDown: boolean = false;
  let dDown: boolean = false;
  let aDown: boolean = false;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let moveCommend: string | undefined;
      switch (event.key) {
        case "w":
        case "W":
          if (wDown) break;

          moveCommend = "advance";
          document.getElementById("button-w")?.click();
          wDown = true;
          break;
        case "a":
        case "A":
          if (aDown) break;

          moveCommend = "left";
          document.getElementById("button-a")?.click();
          aDown = true;
          break;
        case "s":
        case "S":
          if (sDown) break;

          moveCommend = "back";
          document.getElementById("button-s")?.click();
          sDown = true;
          break;
        case "d":
        case "D":
          if (dDown) break;

          moveCommend = "right";
          document.getElementById("button-d")?.click();
          dDown = true;
          break;
        default:
          break;
      }
      if (moveCommend)
        axios
          .post("http://localhost:5000/action", { commend: moveCommend })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let stopCommend: string | undefined;
      switch (event.key) {
        case "w":
        case "W":
          wDown = false;
          stopCommend = "stop advance";
          document.getElementById("button-w")?.click();
          break;
        case "a":
        case "A":
          aDown = false;
          stopCommend = "stop left";
          document.getElementById("button-a")?.click();
          break;
        case "s":
        case "S":
          sDown = false;
          stopCommend = "stop back";
          document.getElementById("button-s")?.click();
          break;
        case "d":
        case "D":
          dDown = false;
          stopCommend = "stop right";
          document.getElementById("button-d")?.click();
          break;
        default:
          break;
      }
      if (stopCommend)
        axios
          .post("http://localhost:5000/action", { commend: stopCommend })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
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
        <Button id="button-w" type="primary" style={{ marginBottom: 10, marginLeft: 56 }}>
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
