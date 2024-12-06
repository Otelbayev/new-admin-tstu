import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext/index";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useStatusContext } from "../../../context/Status";

const UpdateLearningForm = () => {
  const { ip } = useIpContext();
  const { id } = useParams();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { statusData, getStatus } = useStatusContext();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/learningform/updatelearningform/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      res.status === 200 && message.success({ key: "key", content: "Success" });
      navigate(`/${i18n.language}/admin/learning-form/edit/${res.data.new_id}`);
    } catch (err) {
      message.error({ key: "key", content: "Error" });
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/learningform/getbyidlearningform/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    res.status === 200 &&
      form.setFieldsValue({
        title: res.data.title,
        status_id: res.data.status_.id,
        is_active: res.data.is_active,
      });
  };

  useEffect(() => {
    getStatus("uz");
    getData();
  }, []);

  return (
    <Wrapper back={true} title="Update Learning Form">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Title required" }]}
              name="title"
              label="Title"
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
          <Col span={12}>
            <Button type="primary" htmlType="submit">
              update
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UpdateLearningForm;
