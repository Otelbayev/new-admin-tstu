import React, { useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import { Editor } from "../../components/Generics";
import { useLanguageContext } from "../../../context/LanguageContext";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useCreate } from "./../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

const AdditionalsCreate = ({
  title,
  createUrl,
  createUrlTrans,
  transId,
  path,
}) => {
  const [value, setValue] = useState("uz");
  const editorRef = useRef();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { options } = useLanguageContext();
  const language_id = options.find((option) => option.code === value)?.id;

  const handleSubmit = async (e) => {
    const res = await useCreate(
      value,
      "obj",
      {
        title: e.title,
        description: e.desc,
        text: $(editorRef.current)?.summernote("code")?.trim(),
      },
      `${import.meta.env.VITE_BASE_URL_API}${createUrl}`,
      `
        ${import.meta.env.VITE_BASE_URL_API}${createUrlTrans}
      `,
      transId,
      [{ language_id }]
    );

    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/${i18n.language}/admin/${path}/edit/${res.id}`)
        : navigate(`/${i18n.language}/admin/${path}`);
    }
  };
  return (
    <Wrapper title={title}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col sx={24} md={7}>
            <Form.Item name="title" label="Mavzu">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={7}>
            <Form.Item name="desc" label="Izoh">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={10}>
            <Form.Item label=" ">
              <Editor ref={editorRef} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              yaratish
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AdditionalsCreate;
