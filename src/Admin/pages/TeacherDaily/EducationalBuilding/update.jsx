import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useIpContext } from "../../../context/IpContext/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStatusContext } from "../../../context/Status/index";

const Update = () => {
  const { ip } = useIpContext();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { statusData, getStatus } = useStatusContext();
  const [form] = Form.useForm();

  const getData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/educationalbuilding/getbyideducationalbuilding/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      form.setFieldsValue({
        id: res.data.id,
        name: res.data.name,
        address: res.data.address,
        description: res.data.description,
        location: res.data.location,
        status_id: res.data.status_.id,
        is_active: res.data.is_active,
      });
    }
  };

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Adding..." });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/educationalbuilding/updateeducationalbuilding/${id}`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Added successfully" });
        navigate(`/${i18n.language}/admin/edu-build`);
      }
    } catch (err) {
      message.error({ key: "key", content: "Error!" });
    }
  };

  useEffect(() => {
    getData();
    getStatus("uz");
  }, []);

  return (
    <Wrapper title="Update Education Build">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input  name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Location" name="location">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Is Active" name="is_active">
              <Select
                options={[
                  {
                    label: "True",
                    value: true,
                  },
                  { label: "False", value: false },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Status" name="status_id">
              <Select options={statusData} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary">
              update
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Update;
