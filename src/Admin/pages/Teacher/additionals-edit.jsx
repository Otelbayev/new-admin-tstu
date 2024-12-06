import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import { Editor } from "../../components/Generics";
import { useLanguageContext } from "../../../context/LanguageContext";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useEdit } from "./../../hooks/useEdit";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Col, Form, Row, Input } from "antd";

const AdditionalsEdit = ({
  title,
  updUrl,
  updUrlTrans,
  byId,
  byIdTrans,
  createTrans,
  uzId,
}) => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const editorRef = useRef();
  const { id } = useParams();
  const [form] = Form.useForm();

  const { options } = useLanguageContext();
  const language_id = options.find((option) => option.code === value)?.id;

  const handleSubmit = async (e) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        title: e.title,
        description: e.desc,
        text: $(editorRef.current).summernote("code"),
      },
      `${import.meta.env.VITE_BASE_URL_API}${updUrl}`,
      `${import.meta.env.VITE_BASE_URL_API}${updUrlTrans}`,
      [{ [uzId]: Number(id) }, { language_id }],
      [],
      `${import.meta.env.VITE_BASE_URL_API}${createTrans}`,
      [{ [uzId]: Number(id) }, { language_id }]
    );

    if (res?.status === 200) {
      setIsCreate(false);
    }
  };

  const getData = async (id, value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}${byId}/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }${byIdTrans}/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.data.id !== 0) {
      form.setFieldsValue({
        title: res.data?.title,
        desc: res.data?.description,
      });
      $(editorRef.current).summernote("code", res.data.text);
      setIsCreate(false);
      setTransId(res.data.id);
    } else {
      setTransId(null);
      setIsCreate(true);
      form.resetFields();
      $(editorRef.current).summernote("code", "");
    }
  };

  useEffect(() => {
    getData(id, value);
  }, [value, isCreate]);

  return (
    <Wrapper title={title}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
              {isCreate ? "yaratish" : "yangilash"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AdditionalsEdit;
