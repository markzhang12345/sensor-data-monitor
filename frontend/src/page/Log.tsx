import React from "react";
import { List, Typography } from "antd";
import { Action } from "../Types/Types";
import { useEffect, useState } from "react";
import axios from "axios";

const { Title } = Typography;

const Log: React.FC = () => {
  // let actions: Action[] = [];
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/action/log")
      .then((res) => {
        setActions(res.data);
      })
      .catch((err) => {
        console.log("getting actions wrong");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <Title level={2}>Action Log</Title>{" "}
      {
        <List
          bordered
          dataSource={actions}
          renderItem={(action) => {
            // 使用 renderItem 渲染每个列表项
            const date = new Date(action.time); // 将字符串格式的时间转换为 Date 对象
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return (
              <List.Item>
                {" "}
                时间: {`${formattedDate} ${formattedTime}`},&emsp;&emsp; 操作: {action.commend}
              </List.Item>
            );
          }}
        />
      }
    </div>
  );
};

export default Log;
