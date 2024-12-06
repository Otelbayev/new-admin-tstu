import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useIpContext } from "../../../context/IpContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStatusContext } from "../../../context/Status";

const Update = () => {
  const { ip } = useIpContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { statusData, getStatus } = useStatusContext();

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", contnet: "Loading.." });
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_API}/roomtype/updateroomtype/${id}`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Success!" });
        navigate(`/${i18n.language}/admin/room-types`);
      }
    } catch (e) {
      message.error({ key: "key", content: "Error!" });
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/roomtype/getbyidroomtype/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      form.setFieldsValue({
        type: res.data.type,
        status_id: res.data.status_.id,
        is_active: res.data.is_active,
      });
    }
  };

  useEffect(() => {
    getData();
    getStatus("uz");
  }, []);

  return (
    <Wrapper title="Update Room Type">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please input your room type",
                },
              ]}
            >
              <Input placeholder="Type" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="is_active" label="Is Active">
              <Select
                options={[
                  {
                    value: true,
                    label: "True",
                  },
                  {
                    value: false,
                    label: "False",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="status_id" label="Status">
              <Select options={statusData} />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              update
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Update;
