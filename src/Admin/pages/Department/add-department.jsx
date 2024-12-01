import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useDepartmentContext } from "../../context/DepartmentContext";
import { useCreate } from "./../../hooks/useCreate";
import Wrapper from "../../components/wrapper";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload as AUpload,
} from "antd";
import Upload from "../../components/Generics/Upload";
import { Editor } from "../../components/Generics";
import { FiUploadCloud } from "react-icons/fi";

const DepartmentCreate = () => {
  const navigate = useNavigate();
  const {
    departmentOptions,
    getSelectDepartment,
    departmentType,
    getDepartmentType,
    getSidebarDepartment,
  } = useDepartmentContext();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const id = options.find((option) => option.code === value)?.id;
  const [form] = Form.useForm();

  const editorRef = useRef(null);

  const onHandleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title_short", e.short);
    formData.append("title", e.title);
    formData.append("description", e.desc);
    formData.append("text", $(editorRef.current)?.summernote("code"));
    formData.append("position", e.pos);
    formData.append("favorite", e.favo);
    formData.append("hemis_id", e.hemis || "");
    formData.append("img_up", e.image?.fileList[0]?.originFileObj || "");
    formData.append("img_icon_up", e.icon?.fileList[0]?.originFileObj || "");
    if (value === "uz") {
      formData.append("parent_id", e.parent);
      formData.append("departament_type_id", e.department_type);
    } else {
      formData.append(
        "parent_id",
        departmentOptions.find((item) => item.value === e.parent)?.parent
      );
      formData.append(
        "departament_type_id",
        departmentType.find((item) => item.value === e.department_type)?.parent
      );
    }

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/departament/createdepartament`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/createdepartamenttranslation`,
      "departament_id",
      [
        { departament_type_translation_id: e.department_type },
        { language_id: id },
      ],
      ["departament_type_id", "hemis_id"]
    );

    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/${i18n.language}/admin/department/edit/${res.id}`)
        : navigate(
            `/${i18n.language}/admin/department/${
              departmentType.find((item) => item.value === e.department_type)
                ?.path
            }`
          );
    }
  };

  useEffect(() => {
    form.setFieldValue("parent", departmentOptions[1]?.value);
  }, [departmentOptions]);
  useEffect(() => {
    form.setFieldValue("department_type", departmentType[0]?.value);
  }, [departmentType]);

  useEffect(() => {
    getSelectDepartment(value);
    getDepartmentType(value);
  }, [value]);

  useEffect(() => {
    getSidebarDepartment();
  }, []);

  return (
    <Wrapper title="Create Department">
      <Form
        layout="vertical"
        onFinish={onHandleSubmit}
        initialValues={{
          favo: false,
        }}
        form={form}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              name="title"
              label={`Title (${value})`}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Short Title is required" }]}
              name="short"
              label={`Short Title (${value})`}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Description is required" }]}
              name="desc"
              label={`Description (${value})`}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Editor lang={value} ref={editorRef} />
          </Col>
          <Col xs={24} md={12}>
            <Upload lang={value} editorRef={editorRef} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Parent is required" }]}
              name={"parent"}
              label={`Parent (${value})`}
            >
              <Select options={departmentOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name={"department_type"}
              label={`Department Type (${value})`}
              rules={[
                { required: true, message: "Department Type is required" },
              ]}
            >
              <Select options={departmentType} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name={"favo"} label={`Favorite (${value})`}>
              <Select
                options={[
                  { value: false, label: "false" },
                  { value: true, label: "true" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name={"hemis"} label={`Hemis ID (${value})`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              rules={[{ required: true, message: "Position is required" }]}
              name={"pos"}
              label={`Position (${value})`}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name={"image"} label={`Image (${value})`}>
              <AUpload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </AUpload>
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name={"icon"} label={`Icon (${value})`}>
              <AUpload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </AUpload>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default DepartmentCreate;
