import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { ChooseFile } from "../../../components/Generics";
import { useStatusContext } from "./../../../context/Status/index";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { id } = useParams();

  const { statusData, getStatus } = useStatusContext();

  const [img, setImg] = useState(null);

  const [form] = Form.useForm();

  const onHandleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", e.title || "");
    formData.append("title_short", e.short || "");
    formData.append("code", e.code || "");
    formData.append("description", e.desc || "");
    formData.append("details", e.detail || "");
    formData.append("img_upload", e.icon?.fileList[0]?.originFileObj);
    formData.append("status_id", e.status);

    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "put",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/language/updatelanguage/${id}`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await sendRequest(baseRequest);
      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Language updated successfully",
        });

        getByID();
      }
    } catch (error) {
      message.error({ key: "key", content: error.message });
    }
  };

  async function getByID() {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/language/getbyidlanguage/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      setImg(res?.data?.img_?.url);
      form.setFieldsValue({
        title: res?.data?.title,
        short: res?.data?.title_short,
        code: res?.data?.code,
        desc: res?.data?.description,
        detail: res?.data?.details,
        status: res?.data?.status_.id,
      });
    }
  }
  useEffect(() => {
    getStatus("uz");
    getByID();
  }, []);

  return (
    <Wrapper title="Edit Language">
      <Form onFinish={onHandleSubmit} form={form} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Short Title"
              name="short"
              rules={[
                {
                  required: true,
                  message: "Please input your short title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Description" name="desc">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Details" name="detail">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Status" name="status">
              <Select options={statusData} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Icon" name="icon">
               <Upload maxCount={1}>
                <Button icon={<FaFileUpload />}>Upload Icon</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Image src={import.meta.env.VITE_BASE_URL_IMG + img} />
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              update
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
