import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AntdSidebar from "../AntdSidebar";

const Uni = () => {
  return (
    <div>
      <Layout

      >
        <AntdSidebar />
        <Layout 
          
        >
          <Content
            style={{
              height: "100vh",
              overflow: "auto",
              padding: "10px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Uni;
