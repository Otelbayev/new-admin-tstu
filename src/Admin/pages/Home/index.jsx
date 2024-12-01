import React from "react";
import { Helmet } from "react-helmet";
import logo from "../../../../public/logo/logo2.png";
import { Card, Col, Row, Statistic } from "antd";
import {
  FcBusinessman,
  FcDepartment,
  FcGenealogy,
  FcManager,
} from "react-icons/fc";
import { Header } from "antd/es/layout/layout";

const Home = () => (
  <div>
    <Header style={{ backgroundColor: "transparent", margin: "10px", textAlign:"center" }}>
      <img src={logo} alt="" style={{ height: "100%" }} />
    </Header>
    <Row style={{ padding: "10px" }} spacing={16} gutter={[16, 16]}>
      <Helmet>
        <title>Admin | Home</title>
      </Helmet>
      <Col xs={24} md={12} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Professor-o’qituvchilar"
            value={1193}
            valueStyle={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3f8600",
            }}
            prefix={<FcBusinessman size={"70px"} />}
            suffix="+"
          />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Talabalar soni"
            value={21453}
            valueStyle={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#cf1322",
            }}
            prefix={<FcManager size={"70px"} />}
            suffix="+"
          />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Fakultetlar"
            value={9}
            valueStyle={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#002686",
            }}
            prefix={<FcDepartment size={"70px"} />}
            suffix="ta"
          />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Ta'lim yonalishlari"
            value={57}
            valueStyle={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bf13cf",
            }}
            prefix={<FcGenealogy size={"70px"} />}
            suffix="ta"
          />
        </Card>
      </Col>
    </Row>
  </div>
);
export default Home;
