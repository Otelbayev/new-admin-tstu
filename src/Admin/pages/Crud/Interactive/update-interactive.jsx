import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useStatusContext } from "./../../../context/Status";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEdit } from "./../../../hooks/useEdit";
import { Col, Form, Row, Input, Select, Image, Upload, Button } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);

  const { options } = useLanguageContext();
  const [form] = Form.useForm();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const [img, setImg] = useState(null);
  const [icon, setIcon] = useState(null);
  const [transId, setTransId] = useState(null);

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("title", e.title);
    formData.append("description", e.desc);
    formData.append("url_", e.link);
    formData.append("img_up", e.image?.fileList[0]?.originFileObj);
    formData.append("icon_up", e.icon?.fileList[0]?.originFileObj);
    formData.append("status_id", e.status);
    formData.append("favorite", e.favo);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/updateinteractiveservices`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/updateinteractiveservicestranslation`,
      [
        { interactive_services_id: id },
        { language_id },
        { status_translation_id: status },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/createinteractiveservicestranslation`,
      [{ interactive_services_id: id }, { language_id }],
      ["status_id"]
    );
    if (res?.status === 200) {
      getDataId(value, id);
    }
  };

  const getDataId = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/getbyidinteractiveservices/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/getbyuzidinteractiveservicestranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data);
      setIsCreate(false);
      setImg(res.data?.img_?.url || res.data?.img_translation_?.url);
      setIcon(res.data?.icon_?.url);
      setTransId(res.data?.id);
      form.setFieldsValue({
        title: res.data?.title,
        desc: res.data?.description,
        link: res.data?.url_,
        status: res.data?.status_?.id || res.data?.status_translation_?.id,
        favo: res.data?.favorite,
      });
    } else {
      setIsCreate(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    getStatus(value);
    getDataId(value, id);
  }, [value, isCreate]);

  console.log(img);

  return (
    <Wrapper
      title={
        isCreate ? "Create Interactive Services" : "Update Interactive Services"
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          favo: false,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Description" name="desc">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Link" name="link">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Favorite" name="favo">
              <Select
                options={[
                  {
                    value: true,
                    label: "true",
                  },
                  {
                    value: false,
                    label: "false",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={6}>
              <Form.Item label="Status" name="status">
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={6}>
            <Form.Item label="Icon" name="icon">
              <Upload maxCount={1}>
                <Button icon={<IoCloudUploadOutline />}>Upload Icon</Button>
              </Upload>
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={6}>
              <Image src={`${import.meta.env.VITE_BASE_URL_IMG}${img}`} />
            </Col>
          )}

          <Col xs={24} md={6}>
            <Form.Item label="Image" name="image">
              <Upload maxCount={1}>
                <Button icon={<IoCloudUploadOutline />}>Upload Image</Button>
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
