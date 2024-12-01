import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  TextArea,
  ChooseFile,
  Select,
} from "../../../components/Generics";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useMenuContext } from "../../../context/MenuContext";
import { usePageContext } from "../../../context/PageContext";
import { useBlogContext } from "../../../context/BlogContext";
import { useDepartmentContext } from "../../../context/DepartmentContext";
import { useCreate } from "../../../hooks/useCreate";
import Wrapper from "../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const [isHigh, setIsHigh] = useState(false);

  const { menuOptions, getMenuType, getParentMenu, parentMenuOptions } =
    useMenuContext();
  const { blogs, getAllBlogs } = useBlogContext();
  const { pageOptions, getAllPageSelect } = usePageContext();
  const { getSelectDepartment, departmentOptions } = useDepartmentContext();
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const language_id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();

  const title = useRef();
  const description = useRef();
  const link = useRef();
  const icon = useRef();
  const position = useRef();
  const highMenuOrder = useRef();

  const [menuType, setMenuType] = useState(null);
  const [parentId, setParentId] = useState(0);
  const [topMenu, setTopMenu] = useState(false);
  const [blog, setBlog] = useState("");
  const [page, setPage] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    setMenuType(menuOptions[0]?.value);
  }, [menuOptions]);

  useEffect(() => {
    setDepartment(departmentOptions[0]?.value);
  }, [departmentOptions]);

  useEffect(() => {
    getMenuType(value);
    getAllBlogs(value);
    getAllPageSelect(value);
    getSelectDepartment(value);
    getParentMenu(value);
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("position", position?.current?.value);
    formData.append("high_menu", highMenuOrder?.current?.value || "");
    formData.append("title", title?.current?.value);
    formData.append("description", description?.current?.value);
    formData.append("link_", link?.current?.value);
    formData.append("top_menu", topMenu);
    formData.append("icon_upload", icon?.current?.files[0] || null);

    if (value === "uz") {
      formData.append("parent_id", parentId || 0);
      formData.append("menu_type_id", menuType);
      formData.append("blog_id", blog || "");
      formData.append("page_id", page || "");
      formData.append("departament_id", department || "");
    } else {
      formData.append(
        "parent_id",
        parentMenuOptions.find((e) => e.value === parentId)?.parent || 0
      );
      formData.append(
        "menu_type_id",
        menuOptions.find((e) => e.value === menuType)?.parent
      );
      formData.append(
        "blog_id",
        blogs.find((e) => e.value === blog)?.parent || ""
      );
      formData.append(
        "page_id",
        pageOptions.find((e) => e.value === page)?.parent || ""
      );
      formData.append(
        "department_id",
        departmentOptions.find((e) => e.value === department)?.parent || ""
      );
    }

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenu`,
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenutranslation`,
      "menu_id",
      [
        { menu_type_translation_id: menuType },
        { blog_translation_id: blog },
        { page_translation_id: page },
        { departament_translation_id: department },
        { language_id },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id"]
    );

    if (res?.statusCode === 200) {
      value === "uz"
        ? navigate(`/${i18n.language}/admin/menu/edit/${res.id}`)
        : navigate(`/${i18n.language}/admin/menu`);
    }
  };

  return (
    <Wrapper title="Create Menu">
      <form onSubmit={handleSubmit} className="form-horizontal row">
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-6"
          label={`Title (${value})`}
          ref={title}
        />
        <TextArea
          className="form-group col-md-6"
          label={`Description (${value})`}
          ref={description}
        />
        <Input
          className="form-group col-md-4"
          label="Position"
          type="number"
          ref={position}
        />
        <Input
          className="form-group col-md-4"
          label="Link"
          placeholder="Link"
          ref={link}
        />
        <ChooseFile className="form-group col-md-4" label="Icon" ref={icon} />
        <Select
          showSearch={true}
          className="form-group col-md-3"
          label="Menu Type"
          options={menuOptions}
          value={menuType}
          onChange={(e) => setMenuType(e)}
        />
        <Select
          showSearch={true}
          label="Parent ID"
          className="form-group col-md-3"
          options={[{ value: 0, label: "Top Menu" }, ...parentMenuOptions]}
          value={parentId}
          onChange={(e) => {
            setParentId(e);
            if (e !== 0) {
              setTopMenu(false);
            }
          }}
        />
        <Select
          className={isHigh ? "form-group col-md-2" : "form-group col-md-3"}
          label="Top menu"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          value={topMenu}
          onChange={(e) => {
            e && setIsHigh(false);
            e && setParentId(0);
            setTopMenu(e);
          }}
        />
        <Select
          className={isHigh ? "form-group col-md-2" : "form-group col-md-3"}
          label="High menu"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          value={isHigh}
          onChange={(e) => {
            e && setTopMenu(false);
            setIsHigh(e);
          }}
        />

        {isHigh && (
          <Input
            className="form-group col-md-2"
            label="Order"
            type="number"
            ref={highMenuOrder}
          />
        )}

        <Select
          showSearch={true}
          label="Blog"
          className="form-group col-md-4"
          options={blogs}
          value={blog}
          onChange={(e) => setBlog(e)}
        />
        <Select
          showSearch={true}
          label="Page"
          className="form-group col-md-4"
          options={pageOptions}
          value={page}
          onChange={(e) => setPage(e)}
        />
        <Select
          showSearch={true}
          label="Department"
          className="form-group col-md-4"
          options={departmentOptions}
          value={department}
          onChange={(e) => setDepartment(e)}
        />
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-success">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
