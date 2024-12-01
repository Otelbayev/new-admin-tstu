import { Button, Col, Collapse, Form, Input } from "antd";
import React, { useState } from "react";
import { MdDeleteForever, MdOutlinePlaylistAdd } from "react-icons/md";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];

const Field = ({ data, onDel }) => {
  const [children, setChildren] = useState([
    {
      id: "1.1",
      key: "",
      value: "",
    },
  ]);
  return (
    <>
      <Col xs={24} md={10}>
        <Form.Item
          label={`Key ${data.id}`}
          name={`key${data.id}`}
          rules={[{ required: true, message: "Key is required" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={10}>
        <Form.Item
          label={`Value ${data.id}`}
          name={`value${data.id}`}
          rules={[{ required: true, message: "Value is required" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col md={2}>
        <Form.Item label=" ">
          <Button style={{ width: "100%" }}>
            <MdOutlinePlaylistAdd size={20} />
          </Button>
        </Form.Item>
      </Col>
      <Col md={2}>
        <Form.Item label=" ">
          <Button
            style={{ width: "100%" }}
            onClick={() => onDel(data.id)}
            danger
          >
            <MdDeleteForever size={20} />
          </Button>
        </Form.Item>
      </Col>
    </>
  );
};

export default Field;
