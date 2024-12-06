import React from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, message, Row, Select, TimePicker } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useIpContext } from "../../../context/IpContext/index";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const [form] = Form.useForm();
  const { ip } = useIpContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleStartTimeChange = (time) => {
    if (time) {
      const endTime = time.add(80, "minute");
      form.setFieldsValue({ end_time: endTime });
    }
  };

  const onFinish = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/lessontime/createlessontime`,
        {
          lesson_plan: e.lesson_plan,
          start_time: e.start_time ? e.start_time.format("HH:mm") : null,
          end_time: e.end_time ? e.end_time.format("HH:mm") : null,
          request_ip: ip,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Success" });
        navigate(`/${i18n.language}/admin/lesson-time`);
      }
    } catch (e) {
      message.error({
        key: "key",
        content: "Error",
      });
    }
  };

  return (
    <Wrapper title="Dars soati qo'shish">
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          lesson_plan: 1,
        }}
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item name="lesson_plan" label="Darslar">
              <Select
                options={[
                  { value: 1, label: "1-dars" },
                  { value: 2, label: "2-dars" },
                  { value: 3, label: "3-dars" },
                  { value: 4, label: "4-dars" },
                  { value: 5, label: "5-dars" },
                  { value: 6, label: "6-dars" },
                  { value: 7, label: "7-dars" },
                  { value: 8, label: "8-dars" },
                  { value: 9, label: "9-dars" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="start_time"
              label="Boshlanish vaqti"
              rules={[
                {
                  required: true,
                  message: "Iltimos, boshlanish vaqti kiriting!",
                },
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                onChange={handleStartTimeChange}
                format={"HH:mm"}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="end_time"
              rules={[
                {
                  required: true,
                  message: "Iltimos, tugash vaqti kiriting!",
                },
              ]}
              label="Tugash vaqti"
            >
              <TimePicker style={{ width: "100%" }} format={"HH:mm"} />
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

export default Add;
