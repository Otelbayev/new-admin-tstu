import React, { useState } from "react";
import Wrapper from "../../components/wrapper";
import { Button, Col, Form, Input, Row } from "antd";
import { MdAssignmentAdd } from "react-icons/md";
import Field from "./field";

const CreateAssetType = () => {
  const [fields, setFields] = useState([
    {
      id: 1,
      key: "",
      value: "",
      children: [
        {
          id: "1.1",
          key: "",
          value: "",
        },
      ],
    },
  ]);
  const onFinish = () => {
  
  };

  const onDel = (id) => {
    const res = fields.filter((e) => e.id !== id);
    setFields(res);
  };

  return (
    <Wrapper title="Create Asset type">
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={18}>
            <Form.Item
              label="Type name"
              rules={[{ required: true, message: "Type name is required" }]}
              name="type_name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Add fields">
              <Button
                style={{ width: "100%" }}
                onClick={() =>
                  setFields((prev) => [
                    ...prev,
                    {
                      id: fields.length + 1,
                      key: "",
                      value: "",
                    },
                  ])
                }
              >
                Add <MdAssignmentAdd size={20} />
              </Button>
            </Form.Item>
          </Col>

          {fields.map((e, index) => {
            // <Field key={index} data={e} onDel={onDel} />;
            e.children?.length &&
              e.children.map((item, index) => {
                return <Field key={index} data={item} onDel={onDel} />;
              });
          })}

          <Col span={24}>
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

export default CreateAssetType;
