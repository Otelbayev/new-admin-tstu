import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStatusContext } from "../../../context/Status";

const UpdateEduLang = () => {
  const { ip } = useIpContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { statusData, getStatus } = useStatusContext();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/educationlanguage/updateeducationlanguage/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      res.status === 200 && message.success({ key: "key", content: "Success" });
      navigate(`/${i18n.language}/admin/edu-lang/edit/${res.data.new_id}`);
    } catch (err) {
      message.error({ key: "key", content: "Error" });
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/educationlanguage/getbyideducationlanguage/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      form.setFieldsValue({
        title: res.data.title,
        description: res.data.description,
        details: res.data.details,
        code: res.data.code,
        status_id: res.data.status_.id,
        is_active: res.data.is_active,
      });
    }
  };

  useEffect(() => {
    getStatus("uz");
    getData();
  }, []);

  return (
    <Wrapper title="Update Education Language" back={true}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col sx={24} md={8}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: "Code is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item
              name="details"
              label="Details"
              rules={[{ required: true, message: "Details is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item name="is_active" label="Is Active">
              <Select
                options={[
                  { value: true, label: "True" },
                  { value: false, label: "False" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item name="status_id" label="Status">
              <Select options={statusData} />
            </Form.Item>
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

export default UpdateEduLang;
