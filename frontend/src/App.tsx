import React from "react";
import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Home from "./page/Home.tsx";
import History from "./page/History.tsx";
import Log from "./page/Log.tsx";
import axios from "axios";
import { stateReducer, initialStates } from "./Reducer.ts";

const { Header, Content, Footer } = Layout;

const newNames = ["操作界面", "历史记录", "操作日志"];
const routes = ["/", "/history", "/log"];

const items = newNames.map((name, index) => ({
  key: index + 1,
  label: <Link to={routes[index]}>{name}</Link>,
}));

const App: React.FC = () => {
  const [taskStates, dispatch] = useReducer(stateReducer, initialStates);

  const fetchState = () => {
    axios
      .get("http://localhost:5000/states/history")
      .then((res) => {
        dispatch({ type: "update", payload: res.data });
      })
      .catch((err) => {
        console.log("getting states wrong");
      });
  };

  useEffect(() => {
    const interval = setInterval(fetchState, 10000);

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Home taskStates={taskStates} />} />
              <Route path="/history" element={<History taskStates={taskStates} />} />
              <Route path="/log" element={<Log />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
