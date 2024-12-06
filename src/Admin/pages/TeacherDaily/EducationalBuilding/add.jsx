import React from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row } from "antd";
import { useIpContext } from "../../../context/IpContext/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const { ip } = useIpContext();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Adding..." });
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/educationalbuilding/createeducationalbuilding`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Added successfully" });
        navigate(`/${i18n.language}/admin/edu-build`);
      }
    } catch (err) {
      message.error({ key: "key", content: "Error!" });
    }
  };

  return (
    <Wrapper title="Add Education Build">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input  name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Location" name="location">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary">
              create
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Add;
