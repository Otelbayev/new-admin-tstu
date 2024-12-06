import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, InputNumber, message, Row, Select } from "antd";
import { useRoomContext } from "../../../context/RoomContext";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext/index";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const [form] = Form.useForm();
  const { ip } = useIpContext();
  const { roomTypes, getRoomTypes, eduBuildType, getEduBuildTypes } =
    useRoomContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/room/createroom`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success({ key: "key", content: "Room created successfully" });
        navigate(`/${i18n.language}/admin/rooms`);
      }
    } catch (error) {
      message.error({ key: "key", content: "Error" });
    }
  };

  useEffect(() => {
    getRoomTypes();
    getEduBuildTypes();
  }, []);

  useEffect(() => {
    form.setFieldValue("room_type_id", roomTypes[0]?.value);
  }, [roomTypes]);

  useEffect(() => {
    form.setFieldValue("educational_bulding_id", eduBuildType[0]?.value);
  }, [eduBuildType]);

  return (
    <Wrapper title="Xona yaratish">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          is_permitted: true,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Xona raqami"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Iltimos xona raqamini kiriting!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Xona turi" name="room_type_id">
              <Select options={roomTypes} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Bino" name="educational_bulding_id">
              <Select options={eduBuildType} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ruxsat" name="is_permitted">
              <Select
                options={[
                  {
                    value: true,
                    label: "Ha",
                  },
                  {
                    value: false,
                    label: "Yoq",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
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
