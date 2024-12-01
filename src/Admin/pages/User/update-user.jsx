import React, { useEffect } from "react";
import Wrapper from "./../../components/wrapper";
import { useUserContext } from "../../context/UserContext";
import { usePersonContext } from "../../context/PersonContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../context/Status/index";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { filterOption } from "../../utils/filter-options";

const opt = [
  { value: true, label: "true" },
  { value: false, label: "false" },
];

const Edit = () => {
  const { getUserType, userTypeData } = useUserContext();
  const { getPersonData, personData } = usePersonContext();
  const { getStatus, statusData } = useStatusContext();
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = async ({
    login,
    password,
    email,
    removed,
    active,
    user_type,
    person,
    status,
  }) => {
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_API}/usercrud/updateuser/${id}`,
        {
          login,
          password,
          email,
          user_type_id: user_type,
          person_id: person,
          status_id: status,
          removed,
          active,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res?.status === 200) {
        message.success({
          key: "key",
          content: "Muvaffaqiyatli o'zgartirildi!",
        });
        getData();
      }
    } catch (error) {
      message.error({ key: "key", content: "Xatolik!" });
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/usercrud/getbyiduser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      form.setFieldsValue({
        login: res.data?.login,
        email: res.data?.email,
        user_type: res.data?.user_type_?.id,
        person: res.data?.person_?.id,
        removed: res.data?.removed,
        active: res.data?.active,
        status: res.data?.status_?.id,
      });
    }
  };

  useEffect(() => {
    getData();
    getUserType("uz");
    getPersonData("uz");
    getStatus("uz");
  }, []);

  return (
    <Wrapper title="Update User">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col sx={24} md={8}>
            <Form.Item label="Login" name="login">
              <Input />
            </Form.Item>
          </Col>
          <Col sx={24} md={8}>
            <Form.Item
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              name="password"
            >
              <Input.Password />
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
          <Col sx={24} md={6}>
            <Form.Item label="Status" name="status">
              <Select options={statusData} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
