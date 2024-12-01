import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import useAxios from "../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEdit } from "./../../../hooks/useEdit";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, Row, Select } from "antd";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const token = Cookies.get("_token");
  const [isCreate, setIsCreate] = useState(false);
  const { id } = useParams();
  const [transId, setTransId] = useState(null);

  const [form] = Form.useForm();

  const onHandleSubmit = async (e) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        status: e.status,
        name: e.name,
        is_deleted: e.is_deleted,
      },
      `${import.meta.env.VITE_BASE_URL_API}/status/updatestatus`,
      `${import.meta.env.VITE_BASE_URL_API}/status/updatestatustranslation`,
      [{ language_id }, { status_id: Number(e.status) }],
      [],
      `${import.meta.env.VITE_BASE_URL_API}/status/createstatustranslation`,
      [{ language_id }, { status_id: Number(e.status) }],
      ["is_deleted"]
    );

    res.status === 200 &&
      getDataById(
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/status/getbyidstatus/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/status/getbyiduzstatustranslation/${id}?language_code=${value}`
      );
  };

  const getDataById = async (urlId) => {
    try {
      const res = await sendRequest({
        method: "get",
        url: urlId,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setIsCreate(false);
        setTransId(res?.data?.id);
        form.setFieldsValue({
          name: res?.data?.name,
          status: res?.data?.status,
          is_deleted: res?.data?.is_deleted,
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
        ? `${import.meta.env.VITE_BASE_URL_API}/status/getbyidstatus/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/status/getbyiduzstatustranslation/${id}?language_code=${value}`
    );
  }, [value, isCreate]);

  return (
    <Wrapper title={isCreate ? "Create Status" : "Update Status"}>
      <Form
        onFinish={onHandleSubmit}
        initialValues={{
          is_deleted: false,
          status: "Active",
        }}
        layout="vertical"
        form={form}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Name is required" }]}
              label="Name"
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Status is required" }]}
              label="Status"
              name="status"
            >
              <Select
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Deleted", label: "Deleted" },
                ]}
              />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8}>
              <Form.Item
                rules={[{ required: true, message: "Status is required" }]}
                label="Is Deleted"
                name="is_deleted"
              >
                <Select
                  options={[
                    { value: true, label: "True" },
                    { value: false, label: "False" },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              {isCreate ? "Create" : "Update"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
