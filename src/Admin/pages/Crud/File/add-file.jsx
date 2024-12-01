import React, { useState } from "react";
import Wrapper from "../../../components/wrapper";
import { useCreate } from "./../../../hooks/useCreate";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { FiUploadCloud } from "react-icons/fi";

const Create = () => {
  const [value, setValue] = useState("uz");

  const { i18n } = useTranslation();

  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("url", e.file?.fileList[0]?.originFileObj);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`,
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
      "files_id",
      [{ language_id }],
      []
    );
    res?.statusCode === 200 && naviagte(`/${i18n.language}/admin/file`);
  };

  return (
    <Wrapper title="Create File">
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "File is required" }]}
              label="File"
              name="file"
            >
              <Upload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload File</Button>
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
