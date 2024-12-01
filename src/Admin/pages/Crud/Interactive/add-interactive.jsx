import React, { useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useCreate } from "./../../../hooks/useCreate";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, Input, Select, Upload, Button } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
const Create = () => {
  const [value, setValue] = useState("uz");

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const language_id = options.find((e) => e.code === value)?.id;

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("description", e.desc);
    formData.append("url_", e.link);
    formData.append("img_up", e.image?.fileList[0]?.originFileObj);
    formData.append("icon_up", e.icon?.fileList[0]?.originFileObj);
    formData.append("favorite", e.favo);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/createinteractiveservices`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/createinteractiveservicestranslation`,
      "interactive_services_id",
      [{ language_id }]
    );

    res.statusCode === 200 && navigate(`/${i18n.language}/admin/interactive`);
  };

  return (
    <Wrapper title="Create Interactive Services">
      <Form
        layout="vertical"
        initialValues={{
          favo: true,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Description" name="desc">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Link" name="link">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Favorite" name="favo">
              <Select
                options={[
                  {
                    value: true,
                    label: "true",
                  },
                  {
                    value: false,
                    label: "false",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Icon" name="icon">
              <Upload maxCount={1}>
                <Button icon={<IoCloudUploadOutline />}>Upload Icon</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Image" name="image">
              <Upload maxCount={1}>
                <Button icon={<IoCloudUploadOutline />}>Upload Image</Button>
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
