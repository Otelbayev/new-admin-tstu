import React, { useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import { Input } from "../../../../components/Generics";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect/index";
import { useCreate } from "./../../../../hooks/useCreate";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const [title, setTitle] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const language_id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    const res = await useCreate(
      value,
      "obj",
      { title },
      `${import.meta.env.VITE_BASE_URL_API}/employeetype/createemployeetype`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/createemployeetypetranslation`,
      "employee_id",
      [{ language_id }]
    );

    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/employeetype`);
  };

  return (
    <Wrapper title={"Edit EmployeeType"}>
      <LanguageSelect onChange={(e) => setValue(e)} />
      <form onSubmit={onHandleSubmit} className="row">
        <Input
          placeholder="title"
          className="form-group col-md-10"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          onFocus={() => setInputStyle({})}
        />
        <div className="form-group col-md-2">
          <button className="btn btn-primary w-100">Yaratish</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
