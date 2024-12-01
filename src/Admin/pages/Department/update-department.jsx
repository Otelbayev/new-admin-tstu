import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useDepartmentContext } from "../../context/DepartmentContext";
import { useEdit } from "./../../hooks/useEdit";
import { useStatusContext } from "./../../context/Status/index";
import Wrapper from "../../components/wrapper";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload as AUpload,
  Image,
} from "antd";
import Upload from "../../components/Generics/Upload";
import { Editor } from "../../components/Generics";
import { FiUploadCloud } from "react-icons/fi";

const DepartmentEdit = () => {
  const { id } = useParams();
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");

  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const {
    departmentOptions,
    departmentType,
    getSelectDepartment,
    getDepartmentType,
  } = useDepartmentContext();
  const { statusData, getStatus } = useStatusContext();
  const [form] = Form.useForm();

  const editorRef = useRef(null);

  const [img, setImg] = useState(null);
  const [icon, setIcon] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

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
    formData.append("status_id", e.status);
    formData.append("parent_id", e.parent);
    formData.append("departament_type_id", e.department_type);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/departament/updatedepartament`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/updatedepartamenttranslation`,
      [
        { language_id },
        { status_translation_id: e.status },
        { departament_id: id },
        {
          departament_type_translation_id: e.department_type,
        },
      ],
      ["departament_type_id", "status_id", "hemis_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/createdepartamenttranslation`,
      [
        { language_id },
        {
          departament_type_translation_id: e.department_type,
        },
        { departament_id: id },
      ],
      ["departament_type_id", "hemis_id"]
    );

    res?.status === 200 && getData(value);
  };

  const getData = async (value) => {
    const res = await sendRequest({
      methos: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/getbyiddepartament/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/getbyuziddepartamenttranslation/${id}?language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    if (res.status === 200) {
      form.setFieldsValue({
        title: res.data?.title,
        short: res.data?.title_short,
        desc: res.data?.description,
        status: res.data?.status_?.id || res?.data?.status_translation_?.id,
        favo: res.data?.favorite,
        pos: res.data?.position,
        hemis: res?.data?.hemis_id,
        parent: res.data?.parent_id || 0,
        department_type:
          res.data?.departament_type_?.id ||
          res.data?.departament_type_translation_?.id,
      });
      setTransId(res.data?.id);
      setIsCreate(false);
      setImg(res.data?.img_?.url || res.data?.img_translation_?.url);
      setIcon(res.data?.img_icon_?.url || res.data?.img_icon_translation_?.url);
      $(editorRef.current)?.summernote("code", `${res?.data?.text || ""}`);
    } else {
      form.resetFields();
      setIsCreate(true);
      $(editorRef.current)?.summernote("code", "");
    }
  };

  useEffect(() => {
    getData(value);
    getStatus(value);
    getSelectDepartment(value);
    getDepartmentType(value);
  }, [value]);

  return (
    <Wrapper title={isCreate ? "Create Department" : "Update Department"}>
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
          {value === "uz" && (
            <Col xs={24} md={isCreate ? 6 : 8}>
              <Form.Item name={"hemis"} label={`Hemis ID (${value})`}>
                <Input />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={isCreate ? 6 : value === "uz" ? 8 : 6}>
            <Form.Item
              rules={[{ required: true, message: "Position is required" }]}
              name={"pos"}
              label={`Position (${value})`}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={value === "uz" ? 8 : 6}>
              <Form.Item name="status" label={`Status (${value})`}>
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={6}>
            <Form.Item name={"image"} label={`Image (${value})`}>
              <AUpload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </AUpload>
            </Form.Item>
          </Col>

          {!isCreate && (
            <Col xs={24} md={6}>
              <Image
                width={100}
                src={import.meta.env.VITE_BASE_URL_IMG + img}
              />
            </Col>
          )}
          <Col xs={24} md={6}>
            <Form.Item name={"icon"} label={`Icon (${value})`}>
              <AUpload maxCount={1}>
                <Button icon={<FiUploadCloud />}>Upload</Button>
              </AUpload>
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={6}>
              <Image
                width={100}
                src={import.meta.env.VITE_BASE_URL_IMG + icon}
              />
            </Col>
          )}

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isCreate ? "Create" : "Update"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default DepartmentEdit;
