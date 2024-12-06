import React from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext/index";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const AddLearningForm = () => {
  const { ip } = useIpContext();

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/learningform/createlearningform`,
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Learning form created successfully",
        });
        navigate(`/${i18n.language}/admin/learning-form`);
      }
    } catch (err) {
      message.error({ key: "key", content: "Error" });
    }
  };

  return (
    <Wrapper back={true} title="Add Learning Form">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={20}>
            <Form.Item
              rules={[{ required: true, message: "Title required" }]}
              name="title"
              label="Title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddLearningForm;
