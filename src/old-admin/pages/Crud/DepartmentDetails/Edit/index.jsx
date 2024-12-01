import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import { useDepartmentContext } from "../../../../context/DepartmentContext";
import { Editor, Select } from "./../../../../components/Generics";
import { useStatusContext } from "./../../../../context/Status/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../../hooks/useEdit";
import Wrapper from "../../../../components/Wrapper";

const Create = () => {
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();
  const editorRef = useRef();
  const [isCreate, setIsCreate] = useState(false);

  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { statusData, getStatus } = useStatusContext();

  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState(null);
  const [transId, setTransId] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!$(editorRef.current)?.summernote("code")) {
      return;
    }

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        text_json: $(editorRef.current)?.summernote("code"),
        departament_id: department,
        status_id: status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/updatedepartamentDetail`,
      `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/updatedepartamentDetailtranslation`,
      [
        { language_id },
        { departament_translation_id: department },
        { status_translation_id: status },
        { departament_detail_id: id },
      ],
      ["status_id", "departament_id"],
      `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/createdepartamentDetailtranslation`,
      [
        { language_id },
        { departament_translation_id: department },
        { departament_detail_id: id },
      ],
      ["status_id", "departament_id"]
    );

    res?.status === 200 && setIsCreate(false);
  };

  async function getData(value, id) {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departamentDetaildetail/getbyiddepartamentDetail/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departamentDetaildetail/getbyuziddepartamentDetailtranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setIsCreate(false);
      setTransId(res?.data?.id);
      $(editorRef.current)?.summernote("code", res?.data?.text_json);
      setDepartment(
        res?.data?.departament_?.id || res?.data?.departament_translation_?.id
      );
      setStatus(res.data?.status_?.id || res.data?.status_translation_?.id);
    } else {
      setIsCreate(true);
      setTransId(null);
      $(editorRef.current)?.summernote("code", "");
      setDepartment(departmentOptions[0]?.value);
      setStatus(statusData[0]?.value);
    }
  }

  useEffect(() => {
    getData(value, id);
    getSelectDepartment(value);
    getStatus(value);
  }, [value, isCreate]);

  useEffect(() => {
    value !== "uz" && setStatus(statusData[0]?.value);
  }, [statusData]);

  return (
    <Wrapper title="Edit Department Details">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <Editor
            label="Department Details"
            className={isCreate ? "col-md-8" : "col-md-6"}
            ref={editorRef}
            lan={value}
          />
          <Select
            className={isCreate ? "col-md-4" : "col-md-3"}
            label="Department"
            showSearch={true}
            options={departmentOptions}
            value={department}
            onChange={(e) => setDepartment(e)}
          />
          {!isCreate && (
            <Select
              className={"col-md-3"}
              label="Status"
              options={statusData}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          )}
          <div className="col-md-2 my-3">
            {isCreate ? (
              <button type="submit" className="btn w-100 btn-success">
                Create
              </button>
            ) : (
              <button type="submit" className="btn w-100 btn-primary">
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
