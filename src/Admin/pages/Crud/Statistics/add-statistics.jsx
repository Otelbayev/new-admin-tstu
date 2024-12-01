import React, { useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useCreate } from "./../../../hooks/useCreate";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Form, InputNumber, Row, Upload, Input, Button } from "antd";
import { FiUploadCloud } from "react-icons/fi";

const Create = () => {
  const [value, setValue] = useState("uz");

  const naviagte = useNavigate();

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("title", e.title);
    formData.append("description", e.desc);
    formData.append("numbers", e.num || 0);
    formData.append("icon_up", e.icon?.fileList[0]?.originFileObj);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumbers`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumberstranslation`,
      "statistical_numbers_id",
      [{ language_id }]
    );

    res.statusCode === 200 && naviagte(`/${i18n.language}/admin/statistics`);
  };

  return (
    <Wrapper title={"Create Statistics"}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="desc" label="Description">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="num" label="Numbrs">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="icon" label="Icon">
              <Upload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
