import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useStatusContext } from "./../../../context/Status/index";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const { id } = useParams();

  const { statusData, getStatus } = useStatusContext();
  const [form] = Form.useForm();

  async function getByID() {
    const res = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/Tokens/getbyidtokens/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      form.setFieldsValue({
        title: res?.data?.title,
        token: res?.data?.token,
        status: res?.data?.status_.id,
      });
    }
  }
  useEffect(() => {
    getByID();
    getStatus("uz");
  }, []);

  const onHandleSubmit = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });

      const res = await sendRequest({
        method: "put",
        url: `${import.meta.env.VITE_BASE_URL_API}/Tokens/updatetokens/${id}`,
        data: {
          title: e.title,
          token: e.token,
          status_id: e.status,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        message.success({ content: "Success", key: "key", duration: 2 });
        getByID();
      } else {
        throw new Error();
      }
    } catch (err) {
      message.error({ content: "Error", key: "key", duration: 2 });
    }
  };

  return (
    <Wrapper title="Edit Token">
      <Form layout="vertical" form={form} onFinish={onHandleSubmit}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Token is required" }]}
              label="Token"
              name="token"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Status" name="status">
              <Select options={statusData} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              create
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
