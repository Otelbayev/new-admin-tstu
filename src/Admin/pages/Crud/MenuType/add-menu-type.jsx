import React, { useState } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row } from "antd";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../../hooks/useCreate";
import { useLanguageContext } from "../../../../context/LanguageContext";

const AddMenuType = () => {
  const [lang, setLang] = useState("uz");

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === lang)?.id;

  const onFinish = async (values) => {
    const res = await useCreate(
      lang,
      "obj",
      {
        title: values.title,
      },
      `${import.meta.env.VITE_BASE_URL_API}/menutype/createmenutype`,
      `${import.meta.env.VITE_BASE_URL_API}/menutype/createmenutypetranslation`,
      "menu_type_id",
      [{ language_id }]
    );
    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/menutype`);
  };

  return (
    <Wrapper title={"Create Menu Type"}>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
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

export default AddMenuType;
