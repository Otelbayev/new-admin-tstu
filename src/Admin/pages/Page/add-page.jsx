import React, { useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import { Button, Col, Form, Input, Row, Upload as UploadAntd } from "antd";
import Editor from "../../components/Generics/Editor";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import Upload from "../../components/Generics/Upload";
import { FiUploadCloud } from "react-icons/fi";
import { useCreate } from "../../hooks/useCreate";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddPage = () => {
  const [lang, setLang] = useState("uz");
  const textRef = useRef(null);
  const { options } = useLanguageContext();
  const id = options.find((option) => option.code === lang)?.id;
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title_short", values.short);
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("text", $(textRef.current).summernote("code"));
    formData.append("img_up", values?.image?.fileList[0]?.originFileObj);
    formData.append("position", 1);
    formData.append("favorite", false);

    const res = await useCreate(
      lang,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/page/createpage`,
      `${import.meta.env.VITE_BASE_URL_API}/page/createpagetranslation`,
      "page_id",
      [{ language_id: id }]
    );

    if (lang === "uz") {
      res?.statusCode === 200 &&
        navigate(`/${i18n.language}/admin/pages/edit/${res?.id}`);
    } else {
      res?.statusCode === 200 && navigate(`/${i18n.language}/admin/pages`);
    }
  };

  return (
    <Wrapper title="Add Page">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label={`Title (${lang})`}
              name="title"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Short Title is required" }]}
              label={`Short Title (${lang})`}
              name="short"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Description is required" }]}
              label={`Description (${lang})`}
              name="desc"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={`Text (${lang})`}>
              <Editor lan={lang} ref={textRef} />
            </Form.Item>
          </Col>
          <Col xs={24} md={16} lg={12}>
            <Form.Item label={`Image and File (${lang})`}>
              <Upload editorRef={textRef} lang={lang} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label={`Image (${lang})`} name="image">
              <UploadAntd
                maxCount={1}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<FiUploadCloud />}>Choose file</Button>
              </UploadAntd>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddPage;
