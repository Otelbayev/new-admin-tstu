import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../hooks/useEdit";
import { useStatusContext } from "../../../context/Status";
import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Input,
  Upload,
  Select,
  Image,
} from "antd";
import { FiUploadCloud } from "react-icons/fi";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const [icon, setIcon] = useState("");

  const [form] = Form.useForm();
  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const getData = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/statisticalnumbers/getbyidstatisticalnumbers/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/statisticalnumbers/getbyuzidstatisticalnumberstranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    console.log(res.data);

    if (res.status === 200) {
      setTransId(res?.data?.id);
      setIcon(res?.data?.icon_?.url);
      setIsCreate(false);
      form.setFieldsValue({
        title: res?.data?.title,
        desc: res?.data?.description,
        num: res?.data?.numbers,
        status: res.data?.status_?.id || res.data?.status_translation_?.id,
      });
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getData(value, id);
    getStatus(value);
  }, [isCreate, value]);

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("title", e.title);
    formData.append("description", e.desc);
    formData.append("numbers", e.num);
    formData.append("icon_up", e.icon?.fileList[0]?.originFileObj);
    formData.append("status_id", e.status);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/updatestatisticalnumbers`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/updatestatisticalnumberstranslation`,
      [
        { statistical_numbers_id: id },
        { language_id },
        { status_translation_id: e.status },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumberstranslation`,
      [{ statistical_numbers_id: id }, { language_id }],
      ["status_id"]
    );

    res.status === 200 && getData(value, id);
  };

  console.log(icon);

  return (
    <Wrapper title={isCreate ? "Create Statistics" : "Update Statistics"}>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="desc" label="Description">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="num" label="Numbrs">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={6}>
              <Form.Item name="status" label="Status">
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={6}>
            <Form.Item name="icon" label="Icon">
              <Upload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={6}>
              <Image src={`${import.meta.env.VITE_BASE_URL_IMG}${icon}`} />
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
