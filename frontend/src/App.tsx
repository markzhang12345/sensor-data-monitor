import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Home from "./page/Home.tsx";
import History from "./page/History.tsx";
import { State } from "./Types/Types.ts";

const { Header, Content, Footer } = Layout;

const newNames = ["操作界面", "历史记录"];
const routes = ["/", "/history"];

const items = newNames.map((name, index) => ({
  key: index + 1,
  label: <Link to={routes[index]}>{name}</Link>,
}));

const App: React.FC = () => {
  const initialState: State = {
    temperature: 20,
    pressure: 1013,
    depth: 0,
    time: new Date().toISOString(),
  };

  const [nowState, setNowState] = useState<State>(initialState);

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
              <Route
                path="/"
                element={<Home nowState={nowState} setNowState={setNowState} />}
              />
              <Route
                path="/history"
                element={<History setNowState={setNowState} />}
              />
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
