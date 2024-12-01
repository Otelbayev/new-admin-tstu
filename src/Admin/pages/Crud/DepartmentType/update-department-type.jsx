import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import useAxios from "../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useStatusContext } from "./../../../context/Status/index";
import { useEdit } from "./../../../hooks/useEdit";
import Wrapper from "../../../components/wrapper";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const token = Cookies.get("_token");
  const [isCreate, setIsCreate] = useState(false);
  const { id } = useParams();
  const { statusData, getStatus } = useStatusContext();
  const [transId, setTransId] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        type: values.title,
        status_id: values.status,
      },
      `${
        import.meta.env.VITE_BASE_URL_API
      }/deartamenttypecontroller/updatedepartamentType`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/deartamenttypecontroller/updatedepartamentTypetranslation`,
      [
        { language_id },
        { status_translation_id: values.status },
        { departament_type_id: id },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/deartamenttypecontroller/createdepartamentTypetranslation`,
      [{ language_id }, { departament_type_id: id }],
      ["status_id"]
    );

    if (res.status === 200) {
      getDataById(
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/deartamenttypecontroller/getbyiddepartamentType/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/deartamenttypecontroller/getbyuziddepartamentTypetranslation/${id}?language_code=${value}`
      );
    }
  };

  const getDataById = async (urlId) => {
    try {
      const res = await sendRequest({
        method: "get",
        url: urlId,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setTransId(res?.data?.id);
        setIsCreate(false);
        form.setFieldsValue({
          title: res?.data?.type,
          status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
        });
      } else {
        setIsCreate(true);
        form.resetFields();
      }
    } catch (err) {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getDataById(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/deartamenttypecontroller/getbyiddepartamentType/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/deartamenttypecontroller/getbyuziddepartamentTypetranslation/${id}?language_code=${value}`
    );
    getStatus(value);
  }, [value, isCreate]);

  return (
    <Wrapper
      title={isCreate ? "Create Department Type" : "Edit Department Type"}
    >
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

export default Edit;
