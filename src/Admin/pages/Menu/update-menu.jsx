import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { FiUploadCloud } from "react-icons/fi";
import { useMenuContext } from "../../context/MenuContext";
import { useBlogContext } from "../../context/BlogContext";
import { usePageContext } from "../../context/PageContext";
import { useDepartmentContext } from "../../context/DepartmentContext";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useCreate } from "../../hooks/useCreate";
import { filterOption } from "../../utils/filter-options";
import Cookies from "js-cookie";
import axios from "axios";
import { useStatusContext } from "../../context/Status";
import { useEdit } from "../../hooks/useEdit";

const UpdateMenu = () => {
  const [lang, setLang] = useState("uz");
  const [form] = Form.useForm();

  const { menuOptions, getMenuType, getParentMenu, parentMenuOptions } =
    useMenuContext();
  const { blogs, getAllBlogs } = useBlogContext();
  const { pageOptions, getAllPageSelect } = usePageContext();
  const { getSelectDepartment, departmentOptions } = useDepartmentContext();
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((e) => e.code === lang)?.id;
  const { id } = useParams();

  const [isCreate, setIsCreate] = useState(false);
  const [img, setImg] = useState("");
  const [transId, setTransId] = useState(null);

  const getDataId = async (value, id) => {
    try {
      const res = await axios.get(
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/menu/getbyidmenu/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/menu/getbyuzidmenutranslation/${id}?language_code=${value}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        setIsCreate(false);
        setImg(res.data?.icon_?.url);
        form.setFieldsValue({
          title: res.data.title,
          desc: res.data.description,
          menu_type:
            res.data?.menu_type_?.id || res.data?.menu_type_translation_?.id,
          parent: res.data?.parent_id,
          blog_id: res.data?.blog_?.id || res.data?.blog_translation_?.id || "",
          page_id: res.data?.page_?.id || res.data?.page_translation_?.id || "",
          departament_id:
            res.data?.departament_?.id ||
            res.data?.departament_translation_?.id ||
            "",
          link: res.data?.link_,
          position: res.data?.position,
          oreder: res.data?.high_menu,
          top_menu: res.data?.top_menu,
          image: res.data?.icon_?.url,
          status: res.data?.status_?.id,
          high_menu: res.data?.high_menu ? true : false,
        });
        if (lang === "uz") {
          setTransId(res.data.id);
        }
      } else {
        setIsCreate(true);
        form.resetFields();
      }
    } catch (err) {
      setIsCreate(true);
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("position", values.position);
    formData.append("high_menu", values.oreder || "");
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("link_", values.link);
    formData.append("top_menu", values.top_menu);
    formData.append("icon_upload", values.image?.fileList[0]?.originFileObj);
    formData.append("parent_id", values.parent);
    formData.append("menu_type_id", values.menu_type);
    formData.append("blog_id", Number(values.blog_id) || "");
    formData.append("page_id", Number(values.page_id) || "");
    formData.append("departament_id", Number(values.department_id) || "");
    formData.append("status_id", values.status);

    const res = await useEdit(
      isCreate,
      lang,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/menu/updatemenu`,
      `${import.meta.env.VITE_BASE_URL_API}/menu/updatemenutranslation`,
      [
        { menu_id: id },
        { language_id },
        {
          menu_type_translation_id: values.menu_type,
        },
        {
          blog_translation_id: values.blog_id || "",
        },
        {
          page_translation_id: values.page_id || "",
        },
        {
          departament_translation_id: values.departament_id || "",
        },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id"],
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenutranslation`,
      [
        { menu_id: id },
        { language_id },
        {
          menu_type_translation_id: values.menu_type,
        },
        {
          blog_translation_id: values.blog_id || "",
        },
        {
          page_translation_id: values.page_id  || "",
        },
        {
          departament_translation_id: values.department_id || "",
        },
        {
          status_translation_id: values.status || "",
        },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id", "status_id"]
    );
    console.log(res);

    if (res.status === 200) {
      getDataId(lang, id);
    }
  };

  useEffect(() => {
    getMenuType(lang);
    getAllBlogs(lang);
    getAllPageSelect(lang);
    getSelectDepartment(lang);
    getParentMenu(lang);
    getDataId(lang, id);
    getStatus(lang);
  }, [lang]);

  return (
    <Wrapper title={isCreate ? "Create Menu" : "Update Menu"}>
      <Form
        layout="vertical"
        initialValues={{
          high_menu: false,
          top_menu: false,
          blog_id: 0,
          page_id: 0,
          department_id: 0,
          parent: 0,
        }}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Title required" }]}
              label={`Title (${lang})`}
              name="title"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "Short Title required" }]}
              label={`Description (${lang})`}
              name="desc"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              rules={[{ required: true, message: "Menu Type" }]}
              name="menu_type"
              label="Menu Type"
            >
              <Select
                options={menuOptions}
                filterOption={filterOption}
                showSearch={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="parent"
              rules={[{ required: true, message: "Parent required" }]}
              label="Parent"
            >
              <Select
                options={[
                  { value: 0, label: "Top Menu" },
                  ...parentMenuOptions,
                ]}
                filterOption={filterOption}
                showSearch={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="link" label="Link">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="blog_id" label="Blog">
              <Select
                options={blogs}
                filterOption={filterOption}
                showSearch={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="page_id" label="Page">
              <Select
                options={pageOptions}
                filterOption={filterOption}
                showSearch={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="department_id" label="Department">
              <Select
                options={departmentOptions}
                filterOption={filterOption}
                showSearch={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="top_menu" label="Top Menu">
              <Select options={opt} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="high_menu" label="Title Menu">
              <Select options={opt} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Oreder" name="oreder">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              rules={[{ required: true, message: "Position required" }]}
              name="position"
              label="Position"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8} lg={6}>
              <Form.Item
                rules={[{ required: true, message: "Required" }]}
                label={`Status (${lang})`}
                name="status"
              >
                <Select style={{ width: "100%" }} options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={6}>
            <Form.Item label={`Image (${lang})`} name="image">
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<FiUploadCloud />}>Choose file</Button>
              </Upload>
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8} lg={6}>
              <Image src={`${import.meta.env.VITE_BASE_URL_IMG}${img}`} />
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

export default UpdateMenu;

const opt = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];
