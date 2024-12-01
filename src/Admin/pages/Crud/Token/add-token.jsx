import React from "react";
import { Button, Col, Form, message, Row, Input } from "antd";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });

      const res = await sendRequest({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/Tokens/createtokens`,
        data: {
          title: e.title,
          token: e.token,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        message.success({ content: "Success", key: "key", duration: 2 });
        navigate(`/${i18n.language}/admin/token`);
      } else {
        throw new Error();
      }
    } catch (err) {
      message.error({ content: "Error", key: "key", duration: 2 });
    }
  };

  return (
    <Wrapper title="Create Token">
      <Form layout="vertical" onFinish={onHandleSubmit}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Token is required" }]}
              label="Token"
              name="token"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              create
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
