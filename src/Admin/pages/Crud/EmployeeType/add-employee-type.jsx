import React, { useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect/index";
import { useCreate } from "./../../../hooks/useCreate";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Row, Input } from "antd";

const AddEmployeeType = () => {
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const language_id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    const res = await useCreate(
      value,
      "obj",
      { title: values.title },
      `${import.meta.env.VITE_BASE_URL_API}/employeetype/createemployeetype`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/createemployeetypetranslation`,
      "employee_id",
      [{ language_id }]
    );

    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/employeetype`);
  };

  return (
    <Wrapper title={"Create Employee Type"}>
      <Form onFinish={onFinish}  layout="vertical">
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

export default AddEmployeeType;
