import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import useAxios from "../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useStatusContext } from "../../../context/Status";
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
  const [transId, setTransId] = useState(null);
  const { statusData, getStatus } = useStatusContext();
  const [form] = Form.useForm();

  const onHandleSubmit = async (e) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        title: e.title,
        status_id: e.status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/country/updatecountry`,
      `${import.meta.env.VITE_BASE_URL_API}/country/updatecountrytranslation`,
      [
        { language_id },
        { status_translation_id: e.status },
        { country_id: id },
      ],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/country/createcountrytranslation`,
      [{ language_id }, { country_id: id }],
      ["status_id"]
    );
    res.status === 200 &&
      getDataById(
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/country/getbyidcountry/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/country/getbyuzidcountrytranslation/${id}?language_code=${value}`
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
        setTransId(res?.data?.id);
        form.setFieldsValue({
          title: res?.data?.title,
          status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
        });
        setIsCreate(false);
      }
      if (res.status === 204) {
        throw new Error();
      }
    } catch (err) {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getDataById(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/country/getbyidcountry/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/country/getbyuzidcountrytranslation/${id}?language_code=${value}`
    );
    getStatus(value);
  }, [value, isCreate]);

  return (
    <Wrapper title={isCreate ? "Create Counrty" : "Update Counrty"}>
      <Form layout="vertical" form={form} onFinish={onHandleSubmit}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={4}>
              <Form.Item
                rules={[{ required: true, message: "Required" }]}
                label="Status"
                name="status"
              >
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={4}>
            <Form.Item label=" ">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                {isCreate ? "create" : "update"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
