import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Upload as UploadAntd,
  Button,
  InputNumber,
} from "antd";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import Upload from "../../components/Generics/Upload";
import { FiUploadCloud } from "react-icons/fi";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useBlogContext } from "../../context/BlogContext";
import { useCreate } from "../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Editor from "../../components/Generics/Editor";

const AddBlog = () => {
  const [lang, setLang] = useState("uz");
  const { options } = useLanguageContext();
  const { blogCategoryOptions, getBlogCategorySelect } = useBlogContext();
  const id = options.find((option) => option.code === lang)?.id;
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const textRef = useRef(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title_short", values.short);
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("text", $(textRef.current).summernote("code"));
    formData.append("img_up", values?.image?.fileList[0]?.originFileObj);
    formData.append("position", values.position);
    formData.append("favorite", values.favo);
    formData.append("event_date", values.start_date);
    formData.append("event_end_date", values.end_date);

    if (lang === "uz") {
      formData.append("blog_category_id", values.blog_category);
    } else {
      formData.append(
        "blog_category_id",
        blogCategoryOptions.find((e) => e.value === values.blog_category)
          ?.parent
      );
    }

    const res = await useCreate(
      lang,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/createblog`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/createblogtranslation`,
      "blog_id",
      [
        { blog_category_translation_id: values.blog_category },
        { language_id: id },
      ],
      ["blog_category_id"]
    );

    if (res?.statusCode === 200) {
      lang === "uz"
        ? navigate(`/${i18n.language}/admin/blogs/edit/${res?.id}`)
        : navigate(`/${i18n.language}/admin/blog/news`);
    }
  };

  useEffect(() => {
    getBlogCategorySelect(lang);
  }, [lang]);

  return (
    <Wrapper title="Add Blog">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item rules={[{ required: true, message: "Title required" }]} label={`Title (${lang})`} name="title">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item rules={[{ required: true, message: "Short Title required" }]} label={`Short Title (${lang})`} name="short">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item rules={[{ required: true, message: "Description required" }]} label={`Description (${lang})`} name="desc">
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
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Event Date (${lang})`}
              name="start_date"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Event end date (${lang})`}
              name="end_date"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Blog Category (${lang})`}
              name="blog_category"
            >
              <Select style={{ width: "100%" }} options={blogCategoryOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Position (${lang})`}
              name="position"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Favorite (${lang})`}
              name="favo"
            >
              <Select style={{ width: "100%" }} options={favoOptions} />
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

export default AddBlog;

const favoOptions = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];
