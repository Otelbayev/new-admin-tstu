import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";

const ImgUpload = ({ lang, language_id, setIsUpload }) => {
  const [form] = Form.useForm();

  const uploadToServer = async (values) => {
    try {
      message.loading({ content: "Loading...", key: "updatable" });

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("url", values.file.fileList[0].originFileObj);
      if (lang !== "uz") {
        formData.append("language_id", language_id);
        formData.append("files_id", "");
      }
      const res = await axios.post(
        lang === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`
          : `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            title: values.title,
          },
        }
      );

      if (res.status === 200) {
        message.success({
          content: "File uploaded",
          key: "updatable",
        });
        form.resetFields();
        setIsUpload(res);
      }
    } catch (err) {
      message.error({
        content: "File not uploaded",
        key: "updatable",
      });
    }
  };

  return (
    <Form layout="vertical" onFinish={uploadToServer} form={form}>
      <Row gutter={[5, 5]}>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label="Image"
            name="file"
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload maxCount={1} beforeUpload={() => false} listType="picture">
              <Button icon={<FiUploadCloud />}>Choose file</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Upload">
            <Button type="primary" htmlType="submit">
              Upload
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ImgUpload;
