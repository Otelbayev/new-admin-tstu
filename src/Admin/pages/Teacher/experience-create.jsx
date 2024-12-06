import React, { useRef, useState } from "react";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../..//context/LanguageContext";
import { useCreate } from "../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { Col, Form, InputNumber, message, Row, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const navigate = useNavigate();

  const { options } = useLanguageContext();

  const id = options.find((option) => option.code === value)?.id;
  const { i18n } = useTranslation();

  const onHandleSubmit = async (e) => {
    const res = await useCreate(
      value,
      "obj",
      {
        since_when: Number(e.since_when),
        until_when: Number(e.until_when),
        whom: e.whom,
        where: e.where,
      },
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivity`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivitytranslation`,
      "person_scientific_activity_id",
      [
        {
          language_id: id,
        },
      ]
    );
    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/${i18n.language}/admin/experience/edit/${res.id}`)
        : navigate(`/${i18n.language}/admin/experience`);
    }
  };

  return (
    <Wrapper title="Yaratish">
      <Form layout="vertical" onFinish={onHandleSubmit}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={4}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="since_when"
              label="Boshlagan yili"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="until_when"
              label="Tugatgan yili"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="whom"
              label="Lavozim"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="where"
              label="Qayerda"
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
