import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect/index";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import { useStatusContext } from "./../../../context/Status/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../hooks/useEdit";
import { Button, Col, Form, Row, Input, Select } from "antd";

const UpdateEmployeeType = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const { statusData, getStatus } = useStatusContext();
  const { options } = useLanguageContext();
  const [form] = Form.useForm();

  const language_id = options.find((e) => e.code === value)?.id;

  const { id } = useParams();

  const onFinish = async (values) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        id: 0,
        title: values.title,
        status_id: values.status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/employeetype/updateemployeetype`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/updateemployeetypetranslation`,
      [
        { employee_id: id },
        { language_id },
        { status_translation_id: values.status },
      ],
      ["status_id", "id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/createemployeetypetranslation`,
      [{ language_id }, { employee_id: id }],
      ["status_id", "id"]
    );

    res?.status === 200 && getData(value, id);
  };

  const getData = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/employeetype/getbyidemployeetype/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/employeetype/getbyuzidemployeetypetranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      form.setFieldsValue({
        title: res?.data?.title,
        status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
      });
      setIsCreate(false);
      setTransId(res.data?.id);
    } else {
      setIsCreate(true);
      setTransId(null);
      form.resetFields();
    }
  };

  useEffect(() => {
    getStatus(value);
    getData(value, id);
  }, [value]);

  return (
    <Wrapper title={isCreate ? "Create EmployeeType" : "Update EmployeeType"}>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>

          <Col xs={24} md={isCreate ? 20 : 16}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
              label="Title"
            >
              <Input />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={4}>
              <Form.Item label="Status" name="status">
                <Select style={{ width: "100%" }} options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={4}>
            <Form.Item label="Action">
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                {isCreate ? "Create" : "Update"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UpdateEmployeeType;
