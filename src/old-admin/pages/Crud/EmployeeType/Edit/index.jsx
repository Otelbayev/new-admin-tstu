import React, { useEffect, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import { Input, Select } from "../../../../components/Generics";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect/index";
import { useCreate } from "./../../../../hooks/useCreate";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import { useStatusContext } from "./../../../../context/Status/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../../hooks/useEdit";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);

  const [title, setTitle] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const [status, setStatus] = useState(null);
  const [transId, setTransId] = useState(null);

  const { statusData, getStatus } = useStatusContext();
  const { options } = useLanguageContext();

  const language_id = options.find((e) => e.code === value)?.id;

  const { id } = useParams();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        id: 0,
        title,
        status_id: status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/employeetype/updateemployeetype`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/updateemployeetypetranslation`,
      [{ employee_id: id }, { language_id }, { status_translation_id: status }],
      ["status_id", "id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/createemployeetypetranslation`,
      [{ language_id }, { employee_id: id }],
      ["status_id", "id"]
    );

    res?.status === 200 && setIsCreate(false);
  };

  const getData = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/employeetype/getbyidemployeetype/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/employeetype/getbyuzidemployeetypetranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setTitle(res?.data?.title);
      setStatus(res?.data?.status_?.id || res.data?.status_translation_?.id);
      setIsCreate(false);
      setTransId(res.data?.id);
    } else {
      setTitle("");
      setStatus(statusData[0]?.id);
      setIsCreate(true);
      setTransId(null);
    }
  };

  useEffect(() => {
    getStatus(value);
    getData(value, id);
  }, [value, isCreate]);

  return (
    <Wrapper title={"Create EmployeeType"}>
      <LanguageSelect onChange={(e) => setValue(e)} />
      <form onSubmit={onHandleSubmit} className="row">
        <Input
          placeholder="title"
          className={`form-group ${isCreate ? "col-md-10" : "col-md-7"}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          onFocus={() => setInputStyle({})}
        />
        {!isCreate && (
          <Select
            className={"form-group col-md-3"}
            value={status}
            onChange={(e) => setStatus(e)}
            options={statusData}
          />
        )}
        <div className="form-group col-md-2">
          {isCreate ? (
            <button className="btn btn-success w-100">Yaratish</button>
          ) : (
            <button className="btn btn-primary w-100">Yangilash</button>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
