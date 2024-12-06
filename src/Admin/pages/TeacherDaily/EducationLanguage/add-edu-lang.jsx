import React from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddEduLang = () => {
  const { ip } = useIpContext();
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/educationlanguage/createeducationlanguage`,
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      res.status === 200 && message.success({ key: "key", content: "Success" });
      navigate(`/${i18n.language}/admin/edu-lang`);
    } catch (err) {
      message.error({ key: "key", content: "Error" });
    }
  };

  return (
    <Wrapper title="Add Education Language" back={true}>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col sx={24} md={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={12}>
            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: "Code is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={12}>
            <Form.Item
              name="details"
              label="Details"
              rules={[{ required: true, message: "Details is required!" }]}
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

export default AddEduLang;
