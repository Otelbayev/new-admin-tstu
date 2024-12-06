import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, message, Row, Select, TimePicker } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useIpContext } from "../../../context/IpContext/index";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useStatusContext } from "../../../context/Status";

const Update = () => {
  const [form] = Form.useForm();
  const { ip } = useIpContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { id } = useParams();
  const { statusData, getStatus } = useStatusContext();

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/lessontime/getbyidlessontime/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      form.setFieldsValue({
        lesson_plan: res.data.lesson_plan,
        start_time: dayjs(res.data.start_time, "HH:mm"),
        end_time: dayjs(res.data.end_time, "HH:mm"),
        is_active: res.data.is_active,
        status_id: res.data.status_.id,
      });
    }
  };

  const handleStartTimeChange = (time) => {
    if (time) {
      const endTime = time.add(80, "minute");
      form.setFieldsValue({ end_time: endTime });
    }
  };

  const onFinish = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/lessontime/updatelessontime/${id}`,
        {
          lesson_plan: e.lesson_plan,
          start_time: e.start_time ? e.start_time.format("HH:mm") : null,
          end_time: e.end_time ? e.end_time.format("HH:mm") : null,
          request_ip: ip,
          is_active: e.is_active,
          status_id: e.status_id,
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

  useEffect(() => {
    getData();
    getStatus("uz");
  }, []);

  return (
    <Wrapper title="Dars soati o'zgartirish">
      <Form layout="vertical" form={form} onFinish={onFinish}>
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
          <Col xs={24} md={8}>
            <Form.Item label="Is Active" name="is_active">
              <Select
                options={[
                  { value: true, label: "True" },
                  {
                    value: false,
                    label: "False",
                  },
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
            <Button type="primary" htmlType="submit">
              yangilash
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Update;
