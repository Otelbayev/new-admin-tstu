import React, { useEffect } from "react";
import Wrapper from "./../../components/wrapper";
import { useUserContext } from "../../context/UserContext";
import { usePersonContext } from "../../context/PersonContext";
import { useCreate } from "./../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Form, Input, Row, Select, Button } from "antd";
import { filterOption } from "../../utils/filter-options";

const Create = () => {
  const { getUserType, userTypeData } = useUserContext();
  const { getPersonData, personData } = usePersonContext();
  const { i18n } = useTranslation();
  const naviagte = useNavigate();

  const opt = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  const onFinish = async (e) => {
    const res = await useCreate(
      "uz",
      "obj",
      {
        login: e.login,
        password: e.password,
        email: e.email,
        user_type_id: e.user_type,
        person_id: e.person,
        removed: e.removed,
        active: e.active,
      },
      `${import.meta.env.VITE_BASE_URL_API}/usercrud/createuser`
    );

    if (res?.statusCode === 200) {
      naviagte(`/${i18n.language}/admin/users`);
    }
  };

  useEffect(() => {
    getUserType("uz");
    getPersonData("uz");
  }, []);

  return (
    <Wrapper title="Create User">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          removed: false,
          active: true,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col sx={24} md={8}>
            <Form.Item label="Login" name="login">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={6}>
            <Form.Item
              label="User Type"
              rules={[{ required: true, message: "User Type is required" }]}
              name="user_type"
            >
              <Select
                options={userTypeData}
                showSearch
                filterOption={filterOption}
              />
            </Form.Item>
          </Col>
          <Col sx={24} md={6}>
            <Form.Item
              rules={[{ required: true, message: "Person is required" }]}
              label="Person"
              name="person"
            >
              <Select
                options={personData}
                showSearch
                filterOption={filterOption}
              />
            </Form.Item>
          </Col>
          <Col sx={24} md={6}>
            <Form.Item label="Removed" name="removed">
              <Select options={opt} />
            </Form.Item>
          </Col>
          <Col sx={24} md={6}>
            <Form.Item label="Active" name="active">
              <Select options={opt} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
