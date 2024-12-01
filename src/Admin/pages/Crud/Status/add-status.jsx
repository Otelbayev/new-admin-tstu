import React, { useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useCreate } from "./../../../hooks/useCreate";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Input, Row, Select } from "antd";

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
      {
        name: e.name,
        status: e.status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/status/createstatus`,
      `${import.meta.env.VITE_BASE_URL_API}/status/createstatustranslation`,
      "status_id",
      [{ language_id }]
    );

    res.statusCode === 200 && navigate(`/${i18n.language}/admin/status`);
  };

  return (
    <Wrapper title="Create Status">
      <Form
        onFinish={onHandleSubmit}
        initialValues={{
          status: "Active",
        }}
        layout="vertical"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              rules={[{ required: true, message: "Name is required" }]}
              label="Name"
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              rules={[{ required: true, message: "Status is required" }]}
              label="Status"
              name="status"
            >
              <Select
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Deleted", label: "Deleted" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label=" ">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
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

export default Create;
