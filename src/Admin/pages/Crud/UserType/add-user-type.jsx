import React, { useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useCreate } from "./../../../hooks/useCreate";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Input, Row } from "antd";

const Create = () => {
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await useCreate(
      value,
      "obj",
      { type: values.title },
      `${import.meta.env.VITE_BASE_URL_API}/usertype/createusertype`,
      `${import.meta.env.VITE_BASE_URL_API}/usertype/createusertypetranslation`,
      "user_types_id",
      [{ language_id }]
    );

    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/usertype`);
  };

  return (
    <Wrapper title="Create User Type">
      <Form onFinish={onFinish} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={20}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
              label="Title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label="Action">
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
