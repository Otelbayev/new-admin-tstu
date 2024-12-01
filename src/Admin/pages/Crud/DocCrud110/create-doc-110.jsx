import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Col,
  Form,
  message,
  Row,
  Input,
  Select,
  InputNumber,
  Button,
} from "antd";
import { useDepartmentContext } from "../../../context/DepartmentContext";
import { IoMdAdd } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";

const CreateDoc110 = () => {
  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const [parentOptions, setParentOptions] = useState([]);

  const [form] = Form.useForm();

  const [mock, setMock] = useState([
    {
      sequence_number: 1,
      profil_user_id: 0,
    },
  ]);

  const handleSelectChange = (index, newValue) => {
    const updatedMock = [...mock];
    updatedMock[index].profil_user_id = newValue;
    setMock(updatedMock);
  };

  const handleInputChange = (index, newValue) => {
    const updatedMock = [...mock];
    updatedMock[index].sequence_number = Number(newValue);
    setMock(updatedMock);
  };

  async function onFinish(e) {
    try {
      message.loading({ key: "sub", content: "Loading..." });
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110controller/createdocumentteacher110`,
        {
          title: e.title,
          parent_id: e.parent,
          indicator: e.ind1,
          max_score: e.score,
          description: e.desc,
          document_sequence: mock,
          avtor: e.author,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "sub", content: "Successfully created!" });
        form.resetFields();
        setMock([
          {
            sequence_number: 1,
            profil_user_id: 0,
          },
        ]);
      }
    } catch (err) {
      message.error({ key: "sub", content: "Error!" });
    }
  }

  const bool = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  useEffect(() => {
    getSelectDepartment("uz");
    fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110controller/getalldocumentteacher110select`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.map((e) => ({ label: e.title, value: e.id })))
      .then((res) => {
        setParentOptions(res);
      });
  }, []);

  return (
    <Wrapper title={"Create Document 110"}>
      <Form
        initialValues={{
          title: "",
          description: "",
          parent: 0,
          score: null,
          ind1: true,
          author: true,
        }}
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Description is required" }]}
              label="Desctiption"
              name="desc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Parent" name="parent">
              <Select
                options={[{ label: "Parent", value: 0 }, ...parentOptions]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              rules={[{ required: true, message: "Score is required" }]}
              label="Ball"
              name="score"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Indicator 1" name="ind1">
              <Select options={bool} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Author" name="author">
              <Select options={bool} />
            </Form.Item>
          </Col>
          <Col span={20}>
            <Row gutter={[10, 10]}>
              {mock.map((e, index) => (
                <>
                  <Col
                    xs={index === 0 ? 24 : 22}
                    md={index === 0 ? 12 : 10}
                    key={index}
                  >
                    <Select
                      label={`User Profile ${index + 1}`}
                      options={departmentOptions}
                      value={e.profil_user_id}
                      onChange={(e) => handleSelectChange(index, e)}
                      showSearch={true}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col xs={index === 0 ? 24 : 22} md={index === 0 ? 12 : 10}>
                    <InputNumber
                      label={`Sequence Number ${index + 1}`}
                      value={e.sequence_number}
                      style={{ width: "100%" }}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </Col>
                  {index !== 0 && (
                    <Col span={4}>
                      <Button
                        type="primary"
                        danger
                        icon={<FaDeleteLeft />}
                        style={{ width: "100%" }}
                        onClick={() =>
                          setMock(mock.filter((_, i) => i !== index))
                        }
                      />
                    </Col>
                  )}
                </>
              ))}
            </Row>
          </Col>
          <Col span={4}>
            <Button
              icon={<IoMdAdd size={20} />}
              style={{ width: "100%" }}
              onClick={() =>
                setMock([
                  ...mock,
                  {
                    sequence_number: mock[mock.length - 1].sequence_number + 1,
                    profil_user_id: 0,
                  },
                ])
              }
            />
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default CreateDoc110;
