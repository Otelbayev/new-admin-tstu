import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, InputNumber, message, Row, Select } from "antd";
import { useRoomContext } from "../../../context/RoomContext";
import axios from "axios";
import { useIpContext } from "../../../context/IpContext/index";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStatusContext } from "../../../context/Status";

const Add = () => {
  const [form] = Form.useForm();
  const { ip } = useIpContext();
  const { statusData, getStatus } = useStatusContext();
  const { roomTypes, getRoomTypes, eduBuildType, getEduBuildTypes } =
    useRoomContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { id } = useParams();

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/room/getbyidroom/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    console.log(res.data);

    res.status === 200 &&
      form.setFieldsValue({
        number: res.data.number,
        room_type_id: res.data.room_type_.id,
        educational_bulding_id: res.data.educational_bulding_.id,
        is_permitted: res.data.is_permitted,
        is_active: res.data.is_active,
        status_id: res.data.status_.id,
      });
  };

  const onFinish = async (e) => {
    e.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_API}/room/updateroom/${id}`,
        e,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success({ key: "key", content: "Room updated successfully" });
        navigate(`/${i18n.language}/admin/rooms`);
      }
    } catch (error) {
      message.error({ key: "key", content: "Error" });
    }
  };

  useEffect(() => {
    getRoomTypes();
    getEduBuildTypes();
    getStatus("uz");
    getData();
  }, []);

  return (
    <Wrapper title="Xona o'zgartirish">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
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
          <Col xs={24} md={8}>
            <Form.Item label="Xona turi" name="room_type_id">
              <Select options={roomTypes} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Bino" name="educational_bulding_id">
              <Select options={eduBuildType} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
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
          <Col>
            <Button type="primary" htmlType="submit">
              yangilash
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Add;
