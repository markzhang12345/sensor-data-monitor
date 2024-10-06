import React from "react";
import { useEffect, useState } from "react";
import { List, Typography } from "antd";
import axios from "axios";
import { State, HistoryProps } from "../Types/Types";

const { Title } = Typography; // 解构赋值，从 Typography 中提取 Title 组件

const History: React.FC<HistoryProps> = ({ setNowState }) => {
  const [taskState, setTaskState] = useState<State[]>([]);

  const fetchState = () => {
    axios
      .get("http://localhost:5000/states/history")
      .then((res) => {
        setTaskState(res.data);
        const newState = res.data[0];
        setNowState(newState);
      })
      .catch((err) => {
        console.log("getting states wrong");
      });
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 10000);

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <Title level={2}>History</Title>{" "}
      {
        <List
          bordered
          dataSource={taskState}
          renderItem={(state) => {
            // 使用 renderItem 渲染每个列表项
            const date = new Date(state.time); // 将字符串格式的时间转换为 Date 对象
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return (
              <List.Item>
                {" "}
                时间: {`${formattedDate} ${formattedTime}`},&emsp;&emsp; 温度:{" "}
                {state.temperature}°C,&emsp; 压力: {state.pressure}kPa,&emsp;
                深度: {state.depth}m
              </List.Item>
            );
          }}
        />
      }
    </div>
  );
};

export default History;
