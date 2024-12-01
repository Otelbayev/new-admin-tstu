import React, { useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Editor, Input } from "../../components/Generics";
import { useLanguageContext } from "../../../context/LanguageContext";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useCreate } from "./../../hooks/useCreate";
import { useNavigate } from "react-router-dom";

const AdditionalsCreate = ({
  title,
  createUrl,
  createUrlTrans,
  transId,
  path,
}) => {
  const [value, setValue] = useState("uz");
  const editorRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const navigate = useNavigate();

  const { options } = useLanguageContext();
  const language_id = options.find((option) => option.code === value)?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await useCreate(
      value,
      "obj",
      {
        title: titleRef.current?.value,
        description: descRef.current?.value,
        text: $(editorRef.current)?.summernote("code")?.trim(),
      },
      `${import.meta.env.VITE_BASE_URL_API}${createUrl}`,
      `
        ${import.meta.env.VITE_BASE_URL_API}${createUrlTrans}
      `,
      transId,
      [{ language_id }]
    );

    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/admin/${path}/edit/${res.id}`)
        : navigate(`/admin/${path}`);
    }
  };
  return (
    <Wrapper title={title}>
      <form className="form-horizontal row" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <Input
          ref={titleRef}
          className="form-group col-md-2"
          label={`Mavzu (${value})`}
        />
        <Input
          ref={descRef}
          className="form-group col-md-2"
          label={`Izoh (${value})`}
        />
        <Editor ref={editorRef} className="form-group col-md-8" />
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-success">
              Yaratish
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdditionalsCreate;
