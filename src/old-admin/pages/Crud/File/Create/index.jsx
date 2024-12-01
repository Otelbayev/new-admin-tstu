import React, { useRef, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import { Input, ChooseFile } from "./../../../../components/Generics";
import { useCreate } from "./../../../../hooks/useCreate";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");

  const { i18n } = useTranslation();

  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const naviagte = useNavigate();

  const [title, setTitle] = useState("");
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !fileRef.current.files[0]) {
      message.error("All files are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", fileRef.current.files[0]);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`,
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
      "files_id",
      [{ language_id }],
      []
    );
    res?.statusCode === 200 && naviagte(`/${i18n.language}/admin/file`);
  };

  return (
    <Wrapper title="Create File">
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className={"col-md-6"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <ChooseFile label="File" className={"col-md-6"} ref={fileRef} />
          <div className="col-md-2 mt-3 ml-2">
            <button className="btn btn-primary w-100">Yaratish</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
