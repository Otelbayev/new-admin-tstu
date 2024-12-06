import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../..//context/LanguageContext";
import { useParams } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import {
  Button,
  Col,
  Form,
  InputNumber,
  message,
  Row,
  Input,
  Select,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "../../hooks/useEdit";
import { useStatusContext } from "../../context/Status";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const { statusData, getStatus } = useStatusContext();

  const { options } = useLanguageContext();
  const { id } = useParams();
  const [form] = Form.useForm();

  const language_id = options.find((option) => option.code === value)?.id;

  const onHandleSubmit = async (e) => {
    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        person_data_id: Number(id),
        since_when: Number(e.since_when),
        until_when: Number(e.until_when),
        whom: e.whom,
        where: e.where,
        status: e.status,
      },
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/updatepersonscientificactivity`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/updatepersonscientificactivitytranslation`,
      [
        {
          person_scientific_activity_id: Number(id),
        },
        {},
        { language_id },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivitytranslation`,
      [
        {
          person_scientific_activity_id: Number(id),
        },
        { language_id },
      ],
      ["status_id"]
    );

    if (res?.data?.statusCode === 200) {
      setIsCreate(false);
    }
  };

  const getData = async (id, value) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/personscientificactivity/getbyidpersonscientificactivityprofil/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/personscientificactivity/getbyidpersonscientificactivitytranslationuzidprofil/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.data.id !== 0) {
      setIsCreate(false);
      setTransId(res?.data?.id);
      form.setFieldsValue({
        since_when: res?.data?.since_when,
        until_when: res?.data?.until_when,
        whom: res.data.whom,
        where: res.data.where,
        status: res.data.status_?.id || res.data.status_translation_?.id,
      });
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getData(id, value);
    getStatus(value);
  }, [value, isCreate]);

  return (
    <Wrapper title={isCreate ? "Yaratish" : "Yangilash"}>
      <Form layout="vertical" onFinish={onHandleSubmit} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={isCreate ? 4 : 8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="since_when"
              label="Boshlagan yili"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={isCreate ? 4 : 8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="until_when"
              label="Tugatgan yili"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="whom"
              label="Lavozim"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              name="where"
              label="Qayerda"
            >
              <Input />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8}>
              <Form.Item name="status" label="Status">
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              {isCreate ? "yaratish" : "yagilash"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
