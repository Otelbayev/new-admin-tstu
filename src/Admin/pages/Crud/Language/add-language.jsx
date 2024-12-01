import React from "react";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", e.title || "");
    formData.append("title_short", e.short || "");
    formData.append("code", e.code || "");
    formData.append("description", e.desc || "");
    formData.append("details", e.detail || "");
    formData.append("img_upload", e.icon?.fileList[0]?.originFileObj);

    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/language/createlanguage`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await sendRequest(baseRequest);
      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Language created successfully",
        });
        navigate(`/${i18n.language}/admin/language`);
      }
    } catch (error) {
      message.error({ key: "key", content: error.message });
    }
  };

  return (
    <Wrapper title="Create Language">
      <Form onFinish={onHandleSubmit} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Short Title"
              name="short"
              rules={[
                {
                  required: true,
                  message: "Please input your short title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Description" name="desc">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Details" name="detail">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Icon" name="icon">
              <Upload maxCount={1}>
                <Button icon={<FaFileUpload />}>Upload Icon</Button>
              </Upload>
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
