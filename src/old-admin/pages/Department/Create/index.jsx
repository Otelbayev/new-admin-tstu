import React, { useEffect, useRef, useState } from "react";
import {
  TextArea,
  Editor,
  FileImg,
  Select,
  ChooseFile,
  Input,
} from "../../../components/Generics";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useDepartmentContext } from "../../../context/DepartmentContext";
import { useCreate } from "./../../../hooks/useCreate";
import Wrapper from "../../../components/Wrapper";
import { useTranslation } from "react-i18next";

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

  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const shortRef = useRef(null);
  const descRef = useRef(null);
  const posRef = useRef(null);
  const imgRef = useRef(null);
  const img2Ref = useRef(null);
  const hemisID = useRef(null);

  const [parent, setParent] = useState(0);
  const [type, setType] = useState(1);
  const [favo, setFavo] = useState(1);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const title_short = shortRef?.current?.value;
    const title = titleRef?.current?.value;
    const description = descRef?.current?.value;
    const text = $(editorRef.current)?.summernote("code");
    const position = Number(posRef?.current?.value);
    const favorite = favo == 1 ? false : true;
    const departament_type_id = type;
    const img_up = imgRef?.current?.files[0];
    const img_icon_up = img2Ref?.current?.files[0];
    const hemis = hemisID?.current?.value;

    const formData = new FormData();
    formData.append("title_short", title_short);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("text", text);
    formData.append("position", position);
    formData.append("favorite", favorite);
    formData.append("hemis_id", hemis);
    if (value === "uz") {
      formData.append("parent_id", parent);
      formData.append("departament_type_id", departament_type_id);
    } else {
      formData.append(
        "parent_id",
        departmentOptions.find((e) => e.value === parent)?.parent
      );

      formData.append(
        "departament_type_id",
        departmentType.find((e) => e.value === departament_type_id)?.parent
      );
    }
    formData.append("img_up", img_up || null);
    formData.append("img_icon_up", img_icon_up || null);

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
        { departament_type_translation_id: departament_type_id },
        { language_id: id },
      ],
      ["departament_type_id", "hemis_id"]
    );

    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/${i18n.language}/admin/department/edit/${res.id}`)
        : navigate(
            `/${i18n.language}/admin/department/${
              departmentType.find((item) => item.value === type)?.path
            }`
          );
    }
  };

  useEffect(() => {
    departmentOptions && setParent(departmentOptions[0]?.value);
  }, [departmentOptions]);

  useEffect(() => {
    departmentType && setType(departmentType[0]?.value);
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
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-3"
          label={`Title (${value})`}
          ref={titleRef}
        />
        <TextArea
          className="form-group col-md-3"
          label={`Short Title (${value})`}
          ref={shortRef}
        />
        <TextArea
          className="form-group col-md-6"
          label={`Description (${value})`}
          ref={descRef}
        />
        <Editor className="form-group col-md-6" lan={value} ref={editorRef} />
        <FileImg
          className="form-group col-md-6"
          lan={value}
          editorRef={editorRef}
        />
        <Select
          onChange={(value) => setParent(value)}
          className={"form-group col-md-4"}
          label="Parent Type"
          value={parent}
          showSearch={true}
          options={departmentOptions}
        />
        <Select
          label="Department Type"
          onChange={(e) => setType(e)}
          className={"form-group col-md-4"}
          value={type}
          showSearch={true}
          options={departmentType}
        />
        <Select
          className="form-group col-md-4"
          label="Favorite"
          options={[
            { value: 1, label: "false" },
            { value: 2, label: "true" },
          ]}
          onChange={(e) => setFavo(e)}
          value={favo}
        />
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label="Hemis ID"
            ref={hemisID}
          />
        )}
        <Input
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Position"
          type="number"
          ref={posRef}
        />
        <ChooseFile
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Image"
          ref={imgRef}
        />
        <ChooseFile
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Icon"
          ref={img2Ref}
        />
        <div className="form-group col-md-12">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-success">
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default DepartmentCreate;
