import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  message,
  Row,
  Upload,
  Input,
  Select,
  Image,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../../context/Status/index";
import { useEdit } from "./../../../hooks/useEdit";
import { FiUploadCloud } from "react-icons/fi";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState("");

  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("status_id", e.status);
    formData.append("url", e.file?.fileList[0]?.originFileObj);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/files/updatefiles`,
      `${import.meta.env.VITE_BASE_URL_API}/files/updatefilestranslation`,
      [{ files_id: id }, { language_id }, { status_translation_id: e.status }],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
      [{ files_id: id }, { language_id }],
      ["status_id"]
    );
    if (res?.status === 200) {
      getData();
    }
  };

  const getData = async () => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/files/getbyidfiles/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/files/getbyuzidfilestranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      setIsCreate(false);
      setTransId(res.data.id);
      setFile(res?.data?.url || res?.data?.files_?.url);
      form.setFieldsValue({
        title: res.data?.title,
        status: res.data?.status_?.id || res.data?.status_translation_?.id,
      });
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getData(value);
    getStatus(value);
  }, [value]);

  return (
    <Wrapper title={isCreate ? "Create File" : "Edit File"}>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
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
          {!isCreate && (
            <Col xs={24} md={12}>
              <Form.Item name="status" label="Status">
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          {!isCreate && (
            <Col xs={24} md={12}>
              <Image src={import.meta.env.VITE_BASE_URL_IMG + file} />
            </Col>
          )}
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              {isCreate ? "Create" : "Update"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
