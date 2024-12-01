import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import useAxios from "../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useStatusContext } from "../../../context/Status";
import { useLocationContext } from "./../../../context/LocationContext/";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const { id } = useParams();

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const { statusData, getStatus } = useStatusContext();
  const { countryData, getSelectCountry } = useLocationContext();

  const language_id = options.find((e) => e.code === value)?.id;

  const [inputStyle, setInputStyle] = useState({});
  const [type, setType] = useState("");
  const [status, setStatus] = useState(null);
  const [country, setCountry] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const [form] = Form.useForm();

  const onHandleSubmit = async (e) => {
    if (!isCreate) {
      try {
        const res = await sendRequest({
          method: "put",
          url:
            value === "uz"
              ? `${
                  import.meta.env.VITE_BASE_URL_API
                }/territorie/updateterritorie/${id}`
              : `${
                  import.meta.env.VITE_BASE_URL_API
                }/territorie/updateterritorietranslation/${transId}`,
          data:
            value === "uz"
              ? {
                  title: e.title,
                  country_id: e.country,
                  status_id: e.status,
                }
              : {
                  title: type,
                  language_id,
                  status_translation_id: e.status,
                  territorie_id: id,
                  country_translation_id: e.country,
                },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          message.success({
            key: "key",
            content: "Updated successfully",
            duration: 2,
          });
          navigate(`/${i18n.language}/admin/region`);
        }
      } catch (err) {
        message.error({
          key: "key",
          content: "Error",
          duration: 2,
        });
      }
    } else {
      try {
        const res = await sendRequest({
          method: "post",
          url: `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/createterritorietranslation`,
          data: {
            title: e.title,
            language_id,
            territorie_id: id,
            country_translation_id: e.country,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          message.success({
            key: "key",
            content: "Created successfully",
            duration: 2,
          });
          navigate(`/${i18n.language}/admin/region`);
        }
      } catch (err) {
        message.error({
          key: "key",
          content: "Error",
          duration: 2,
        });
      }
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
          title: res?.data?.title,
          status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
          country:
            res?.data?.country_?.id || res?.data?.country_translation_?.id,
        });
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
    getStatus(value);
    getSelectCountry(value);
    value === "uz"
      ? getDataById(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/getbyidterritorie/${id}`
        )
      : getDataById(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/getbyuzidterritorietranslation/${id}?language_code=${value}`
        );
  }, [value]);

  return (
    <Wrapper title={isCreate ? "Create Region" : "Update Region"}>
      <Form
        onFinish={onHandleSubmit}
        initialValues={{
          country: countryData[0]?.value,
          status: statusData[0]?.value,
        }}
        layout="vertical"
        form={form}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                },
              ]}
            >
              <Select options={countryData} />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                },
              ]}
            >
              <Select options={statusData} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              {isCreate ? "create" : "update"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
