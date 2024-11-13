const mqtt = require("mqtt");
const State = require("../models/State");
const Action = require("../models/Action");

const broker = "mqtt://172.6.0.240";
const port = 1883;
const topic_sensor = "sensor/data";
const topic_control = "control/movement";

const client = mqtt.connect(broker, { port });

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe([topic_sensor, topic_control], (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log(`Subscribed to topics: ${topic_sensor}, ${topic_control}`);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received message: ${message} on topic: ${topic}`);

  //错误处理
  if (topic === topic_sensor) {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.error("Failed to parse message as JSON:", message);
      return;
    }

    //解析data
    const { temperature, pressure, depth } = data;
    const time = new Date();
    const newState = new State({ temperature, pressure, depth, time });

    newState
      .save()
      .then(() => {
        console.log("State saved successfully");
      })
      .catch((error) => {
        console.error("Error saving state", error);
      });
  } else if (topic === topic_control) {
    console.log("Control signal received:", message.toString());
  }
});

// 向控制主题发送命令的函数
function sendCommand(command) {
  client.publish(topic_control, command, (err) => {
    if (err) {
      console.error("Failed to send control command:", err);
    } else {
      console.log("Control command sent successfully:", command);
    }

    const time = new Date();
    const newAction = new Action({ command, time });

    newAction
      .save()
      .then(() => {
        console.log("Action saved successfully");
      })
      .catch((error) => {
        console.error("Error saving action", error);
      });
  });
}

module.exports = { client, sendCommand };
