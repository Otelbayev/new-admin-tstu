import React, { useRef, useState } from "react";
import {
  ChooseFile,
  Editor,
  FileImg,
  Input,
  Select,
  TextArea,
} from "../../../components/Generics";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useCreate } from "../../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import { useTranslation } from "react-i18next";
const Create = () => {
  const [value, setValue] = useState("uz");
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const shortRef = useRef(null);
  const descRef = useRef(null);
  const imgRef = useRef(null);

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const id = options.find((option) => option.code === value)?.id;

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const titleValue = titleRef?.current?.value?.trim();
    const shortValue = shortRef?.current?.value?.trim();
    const descValue = descRef?.current?.value?.trim();
    const editorCode = $(editorRef.current)?.summernote("code")?.trim();
    const img_up = imgRef.current?.files[0] || null;

    const formData = new FormData();
    formData.append("title_short", shortValue);
    formData.append("title", titleValue);
    formData.append("description", descValue);
    formData.append("text", editorCode || "");
    formData.append("img_up", img_up);
    formData.append("position", 1);
    formData.append("favorite", false);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/page/createpage`,
      `${import.meta.env.VITE_BASE_URL_API}/page/createpagetranslation`,
      "page_id",
      [{ language_id: id }]
    );

  

    if (value === "uz") {
      res?.statusCode === 200 &&
        navigate(`/${i18n.language}/admin/pages/edit/${res?.id}`);
    } else {
      res?.statusCode === 200 && navigate(`/${i18n.language}/admin/pages`);
    }
  };

  return (
    <Wrapper title="Create Page">
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Title (${value})`}
          ref={titleRef}
        />
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Short Title (${value})`}
          ref={shortRef}
        />
        <Editor
          className="form-group col-md-6 card-header"
          lan={value}
          ref={editorRef}
        />
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Description (${value})`}
          ref={descRef}
        />
        <FileImg
          className="form-group col-md-6"
          lan={value}
          editorRef={editorRef}
        />
        <ChooseFile
          label="Image"
          className="form-group col-md-6"
          ref={imgRef}
        />
        <div className="form-group mt-3 col-md-12">
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

export default Create;
