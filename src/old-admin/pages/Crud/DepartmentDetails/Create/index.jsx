import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useCreate } from "./../../../../hooks/useCreate";
import { useDepartmentContext } from "../../../../context/DepartmentContext";
import { Editor, Select } from "./../../../../components/Generics";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();
  const editorRef = useRef();

  const { departmentOptions, getSelectDepartment } = useDepartmentContext();

  const [department, setDepartment] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!$(editorRef.current)?.summernote("code")) {
      return;
    }

    const res = await useCreate(
      value,
      "obj",
      value === "uz"
        ? {
            text_json: $(editorRef.current)?.summernote("code"),
            departament_id: department,
          }
        : {
            text_json: $(editorRef.current)?.summernote("code"),
            departament_id: departmentOptions.find(
              (e) => e.value === department
            )?.parent,
          },
      `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/createdepartamentDetail`,
      `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/createdepartamentDetailtranslation`,
      "departament_detail_id",
      [{ language_id }, { departament_translation_id: department }],
      ["departament_id"]
    );

    res?.statusCode === 200 &&
      navigate(`/${i18n.language}/admin/department-details`);
  };

  useEffect(() => {
    getSelectDepartment(value);
  }, [value]);

  useEffect(() => {
    setDepartment(departmentOptions[0]?.value);
  }, [departmentOptions]);

  return (
    <Wrapper title="Create Deaprtment Details">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <Editor
            label="Department Details"
            className=" col-md-8"
            ref={editorRef}
            lan={value}
          />
          <Select
            className={"col-md-4"}
            label="Department"
            showSearch={true}
            options={departmentOptions}
            value={department}
            onChange={(e) => setDepartment(e)}
          />
          <div className="col-md-2 my-3">
            <button type="submit" className="btn w-100 btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
