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

  const onHandleSubmit = async (e) => {
    const res = await useCreate(
      value,
      "obj",
      { gender: e.gender },
      `${import.meta.env.VITE_BASE_URL_API}/gender/creategender`,
      `${import.meta.env.VITE_BASE_URL_API}/gender/creategendertranslation`,
      "gender_id",
      [{ language_id }]
    );

    res.statusCode === 200 && navigate(`/${i18n.language}/admin/gender`);
  };

  return (
    <Wrapper title="Create Gender">
      <Form layout="vertical" onFinish={onHandleSubmit}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={20}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label="Gender"
              name="gender"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label="Gender" name="gender">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
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