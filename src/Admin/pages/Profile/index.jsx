import React from "react";
import Cookies from "js-cookie";
import {
  message,
  Row,
  Col,
  Typography,
  Card,
  Image,
  Flex,
  Input,
  Form,
  Button,
  Upload,
} from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/avatar.png";
import { Helmet } from "react-helmet";
import { FiUploadCloud } from "react-icons/fi";

const { Title, Text } = Typography;

const Profile = () => {
  const userData = JSON.parse(Cookies.get("_userDetails"));
  const { i18n } = useTranslation();
  const naviagte = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("login", values.email);
    formData.append("password", values.password);
    formData.append("oldPassword", values.oldPassword);
    formData.append("person_.firstName", values.name);
    formData.append("person_.lastName", values.surname);
    formData.append("person_.fathers_name", values.fathers_name);
    formData.append("person_.email", values.email1 || "");
    formData.append("img_up", values.avatar.fileList[0].originFileObj || "");

    try {
      message.loading({ key: "key", content: "O'zgartirilmoqda..." });
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_API}/user/userprofilupdated`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Muvofaqiyyatli o'zgardi!",
        });
        Cookies.remove("_token");
        Cookies.remove("_userDetails");
        naviagte(`/${i18n.language}/signin`);
      }
    } catch (err) {
      message.error({ key: "key", content: "Xatolik" });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin | Profile</title>
      </Helmet>
      <Title>Profile</Title>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={6}>
          <Card>
            <div>
              <Flex justify="center">
                <Image
                  loading="lazy"
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  src={
                    userData?.person_?.img_?.url
                      ? `${import.meta.env.VITE_BASE_URL_IMG}${
                          userData?.person_?.img_?.url
                        }`
                      : avatar
                  }
                  alt="User profile picture"
                />
              </Flex>
              <Title
                style={{ textAlign: "center", paddingTop: "10px" }}
                level={4}
              >
                {userData?.person_?.lastName} {userData?.person_?.firstName}{" "}
                {userData?.person_?.fathers_name}
              </Title>
              <div style={{ textAlign: "center" }}>
                <Text>{userData?.user_type_?.type}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                name: userData?.person_?.firstName,
                surname: userData?.person_?.lastName,
                fathers_name: userData?.person_?.fathers_name,
                email1: userData?.person_?.email,
                email: userData?.login,
              }}
              onFinish={onFinish}
              autoComplete="on"
            >
              <Form.Item
                label="Ism"
                name="name"
                rules={[{ required: true, message: "Ismni kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Familiya"
                name="surname"
                rules={[{ required: true, message: "Familiyani kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Otasining ismi"
                name="fathers_name"
                rules={[
                  { required: true, message: "Otasining ismini kiriting!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email1">
                <Input />
              </Form.Item>
              <Form.Item label="Icon" name="avatar">
                <Upload maxCount={1}>
                  <Button icon={<FiUploadCloud />}>Yuklash</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Login"
                name="email"
                rules={[{ required: true, message: "Loginni kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Hozirgi parol"
                name="oldPassword"
                rules={[
                  { required: true, message: "Hozirgi parolni kiriting!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Yangi parol"
                name="password"
                rules={[{ required: true, message: "Yangi parolni kiriting!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 6 }}>
                <div style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">
                    Yangilash
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
