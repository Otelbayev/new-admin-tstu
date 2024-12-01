import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
  Button,
  Col,
  Form,
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
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../hooks/useCreate";
import { filterOption } from "../../utils/filter-options";

const AddMenu = () => {
  const [lang, setLang] = useState("uz");
  const [form] = Form.useForm();

  const { menuOptions, getMenuType, getParentMenu, parentMenuOptions } =
    useMenuContext();
  const { blogs, getAllBlogs } = useBlogContext();
  const { pageOptions, getAllPageSelect } = usePageContext();
  const { getSelectDepartment, departmentOptions } = useDepartmentContext();
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const language_id = options.find((e) => e.code === lang)?.id;
  const navigate = useNavigate();

  useEffect(() => {
    getMenuType(lang);
    getAllBlogs(lang);
    getAllPageSelect(lang);
    getSelectDepartment(lang);
    getParentMenu(lang);
  }, [lang]);

  useEffect(() => {
    form.setFieldsValue({
      menu_type: menuOptions[0]?.value,
    });
  }, [menuOptions]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("position", values.position);
    formData.append("high_menu", values.oreder || "");
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("link_", values.link);
    formData.append("top_menu", values.top_menu);
    formData.append("icon_upload", values.image?.fileList[0]?.originFileObj);

    if (lang === "uz") {
      formData.append("parent_id", values.parent);
      formData.append("menu_type_id", values.menu_type);
      formData.append("blog_id", Number(values.blog_id) || "");
      formData.append("page_id", Number(values.page_id) || "");
      formData.append("departament_id", Number(values.department_id) || "");
    } else {
      formData.append(
        "parent_id",
        parentMenuOptions.find((e) => e.value === values.parent)?.parent
      );
      formData.append(
        "menu_type_id",
        menuOptions.find((e) => e.value === values.menu_type)?.parent
      );
      formData.append(
        "blog_id",
        Number(blogs.find((e) => e.value === values.blog_id)?.parent) || ""
      );
      formData.append(
        "page_id",
        Number(pageOptions.find((e) => e.value === values.page_id)?.parent) ||
          ""
      );
      formData.append(
        "departament_id",
        Number(
          departmentOptions.find((e) => e.value === values.department_id)
            ?.parent
        ) || ""
      );
    }

    const res = await useCreate(
      lang,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenu`,
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenutranslation`,
      "menu_id",
      [
        { menu_type_translation_id: values.menu_type },
        { blog_translation_id: Number(values.blog_id) || "" },
        { page_translation_id: Number(values.page_id) || "" },
        { departament_translation_id: Number(values.department_id || "") },
        { language_id },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id"]
    );

    if (res?.statusCode === 200) {
      lang === "uz"
        ? navigate(`/${i18n.language}/admin/menu/edit/${res.id}`)
        : navigate(`/${i18n.language}/admin/menu`);
    }
  };

  return (
    <Wrapper title="Create Menu">
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

export default AddMenu;

const opt = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];
