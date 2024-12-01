import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Input,
  TextArea,
  ChooseFile,
  Select,
  Image,
} from "../../../components/Generics";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useMenuContext } from "../../../context/MenuContext";
import { usePageContext } from "../../../context/PageContext";
import { useBlogContext } from "../../../context/BlogContext";
import { useDepartmentContext } from "../../../context/DepartmentContext";
import Wrapper from "../../../components/Wrapper";
import { useStatusContext } from "./../../../context/Status/index";
import axios from "axios";
import { useEdit } from "./../../../hooks/useEdit";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isHigh, setIsHigh] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const icon = useRef();
  const [position, setPosition] = useState("");
  const [highMenuOrder, setHighMenuOrder] = useState("");
  const [menuType, setMenuType] = useState(null);
  const [parentId, setParentId] = useState(0);
  const [topMenu, setTopMenu] = useState(false);
  const [blog, setBlog] = useState("");
  const [page, setPage] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState(null);
  const [img, setImg] = useState("");

  const { menuOptions, getMenuType, getParentMenu, parentMenuOptions } =
    useMenuContext();
  const { blogs, getAllBlogs } = useBlogContext();
  const { pageOptions, getAllPageSelect } = usePageContext();
  const { getSelectDepartment, departmentOptions } = useDepartmentContext();
  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (value === "uz") {
      formData.append("parent_id", parentId);
    } else {
      formData.append(
        "parent_id",
        parentMenuOptions?.find((e) => e.parent === parentId)?.value || 0
      );
    }
    formData.append("position", position || "");
    formData.append("high_menu", highMenuOrder || "");
    formData.append("menu_type_id", menuType);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link_", link || "");
    formData.append("top_menu", topMenu);
    formData.append("blog_id", blog || "");
    formData.append("page_id", page || "");
    formData.append("departament_id", department || "");
    formData.append("icon_upload", icon?.current?.files[0] || null);
    formData.append("status_id", status);

    const res = await useEdit(
      isCreate,
      value,
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
          menu_type_translation_id:
            menuOptions?.find((e) => e.parent === menuType)?.value || "",
        },
        {
          blog_translation_id:
            blogs?.find((e) => e.parent === blog)?.value || "",
        },
        {
          page_translation_id:
            pageOptions?.find((e) => e.parent === page)?.value || "",
        },
        {
          departament_translation_id:
            departmentOptions?.find((e) => e.parent === department)?.value ||
            "",
        },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id"],
      `${import.meta.env.VITE_BASE_URL_API}/menu/createmenutranslation`,
      [
        { menu_id: id },
        { language_id },
        {
          menu_type_translation_id: menuOptions?.find(
            (e) => e.parent === menuType
          )?.value,
        },
        {
          blog_translation_id:
            blogs?.find((e) => e.parent === blog)?.value || "",
        },
        {
          page_translation_id:
            pageOptions?.find((e) => e.parent === page)?.value || "",
        },
        {
          departament_translation_id:
            departmentOptions?.find((e) => e.parent === department)?.value ||
            "",
        },
      ],
      ["menu_type_id", "blog_id", "page_id", "departament_id", "status_id"]
    );

    res?.status === 200 && setIsCreate(false);
  };

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
        if (value === "uz") {
          setPosition(res.data?.position);
          setLink(res.data?.link_);
          setTopMenu(res.data?.top_menu);
          setMenuType(res.data?.menu_type_?.id);
          setParentId(res.data?.parent_id);
          setBlog(res.data?.blog_?.id);
          setPage(res.data?.page_?.id);
          setDepartment(res.data?.departament_?.id);
          if (res.data?.top_menu === true) {
            setHighMenuOrder("");
            setIsHigh(false);
          } else {
            setHighMenuOrder(res.data?.high_menu);
            setIsHigh(res.data?.high_menu ? true : false);
          }
        }

        setIsCreate(false);
        setTransId(res.data?.id);
        setTitle(res.data?.title);
        setDescription(res.data?.description);
        setImg(res.data.icon_?.url);
        setStatus(res.data?.status_?.id);
      } else {
        throw new Error();
      }
    } catch (err) {
      setTitle("");
      setDescription("");
      setIsCreate(true);
      setTransId(null);
    }
  };

  useEffect(() => {
    getMenuType(value);
    getParentMenu(value);
    getAllBlogs(value);
    getAllPageSelect(value);
    getSelectDepartment(value);
    getStatus(value);
    getDataId(value, id);
  }, [value, isCreate]);

  return (
    <Wrapper title="Edit Menu">
      <form onSubmit={handleSubmit} className="form-horizontal row">
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-6"
          label={`Title (${value})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          className="form-group col-md-6"
          label={`Description (${value})`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {value === "uz" && (
          <Input
            className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
            label="Position"
            type="number"
            value={position || ""}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
        )}
        {value === "uz" && (
          <Input
            className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
            label="Link"
            placeholder="Link"
            value={link || ""}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        )}
        <ChooseFile
          className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
          label="Icon"
          ref={icon}
        />
        {!isCreate && (
          <Image
            className="form-group col-md-1"
            label="Icon"
            img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
          />
        )}
        {value === "uz" && (
          <Select
            showSearch={true}
            className="form-group col-md-3"
            label="Menu Type"
            options={menuOptions}
            value={menuType}
            onChange={(e) => {
              setMenuType(e);
            }}
          />
        )}
        {value === "uz" && (
          <Select
            showSearch={true}
            label="Parent ID"
            className="form-group col-md-3"
            options={[{ value: 0, label: "Top Menu" }, ...parentMenuOptions]}
            value={parentId || 0}
            onChange={(e) => {
              setParentId(e);
            }}
          />
        )}
        {value === "uz" && (
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
        )}
        {value === "uz" && (
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
              e && setParentId(parentMenuOptions[0]?.value);
              !e && setHighMenuOrder("");
              setIsHigh(e);
            }}
          />
        )}

        {isHigh && value === "uz" && (
          <Input
            className="form-group col-md-2"
            label="Order"
            type="number"
            value={highMenuOrder || ""}
            onChange={(e) => {
              setHighMenuOrder(e.target.value);
            }}
          />
        )}

        {value === "uz" && (
          <Select
            showSearch={true}
            label="Blog"
            className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
            options={blogs}
            value={blog || ""}
            onChange={(e) => {
              setBlog(e);
            }}
          />
        )}
        {value === "uz" && (
          <Select
            showSearch={true}
            label="Page"
            className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
            options={pageOptions}
            value={page || ""}
            onChange={(e) => {
              setPage(e);
            }}
          />
        )}
        {value === "uz" && (
          <Select
            showSearch={true}
            label="Department"
            className={isCreate ? "form-group col-md-4" : "form-group col-md-3"}
            options={departmentOptions}
            value={department || 0}
            onChange={(e) => {
              setDepartment(e);
            }}
          />
        )}
        {!isCreate && (
          <Select
            label="Status"
            options={statusData}
            value={status}
            onChange={(e) => setStatus(e)}
            className={"form-group col-md-3"}
          />
        )}
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            {isCreate ? (
              <button type="submit" className="btn btn-success">
                Create
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
