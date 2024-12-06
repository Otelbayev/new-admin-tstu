import React from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row } from "antd";
import { useIpContext } from "../../../context/IpContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const { ip } = useIpContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", contnet: "Loading.." });
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/roomtype/createroomtype`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Success!" });
        navigate(`/${i18n.language}/admin/room-types`);
      }
    } catch (e) {
      message.error({ key: "key", content: "Error!" });
    }
  };

  return (
    <Wrapper title="Create Room Type">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={20}>
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your room type",
                },
              ]}
            >
              <Input placeholder="Type" />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              create
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Add;
