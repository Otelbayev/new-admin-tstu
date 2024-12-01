import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import useAxios from "../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../context/LanguageContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocationContext } from "../../../context/LocationContext";
import Wrapper from "../../../components/wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const { countryData, getSelectCountry } = useLocationContext();

  const onHandleSubmit = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/territorie/createterritorie`,
        data: {
          title: e.title,
          country_id: e.country,
        },
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await sendRequest(baseRequest);
      if (res.status === 200 && value !== "uz") {
        await sendRequest({
          method: "post",
          url: `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/createterritorietranslation`,
          data: {
            title: e.title,
            language_id,
            territorie_id: res?.data?.id,
            country_translation_id: e.country,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      message.success({ key: "key", content: "Muvaffaqiyatli!" });
      navigate(`/${i18n.language}/admin/region`);
    } catch (err) {
      message.error({
        key: "key",
        content: `Error: ${err.message || "Failed to create"}`,
      });
    }
  };

  useEffect(() => {
    getSelectCountry(value);
  }, [value]);

  return (
    <Wrapper title="Create Region">
      <Form
        onFinish={onHandleSubmit}
        initialValues={{
          country: countryData[0]?.value,
        }}
        layout="vertical"
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
            <Form.Item label=" ">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Create;
