import React, { useRef, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect";
import { ChooseFile, Input } from "../../../../components/Generics";
import { useCreate } from "./../../../../hooks/useCreate";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");

  const naviagte = useNavigate();

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;

  const titleRef = useRef();
  const descRef = useRef();
  const numbersRef = useRef();
  const iconRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", titleRef.current?.value);
    formData.append("description", descRef.current?.value);
    formData.append("numbers", numbersRef.current?.value);
    formData.append("icon_up", iconRef.current?.files[0]);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumbers`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumberstranslation`,
      "statistical_numbers_id",
      [{ language_id }]
    );

    res.statusCode === 200 && naviagte(`/${i18n.language}/admin/statistics`);
  };

  return (
    <Wrapper title={"Create Statistics"}>
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input label="Title" className="col-md-6" ref={titleRef} />
          <Input label="Description" className="col-md-6" ref={descRef} />
          <Input label="Numbers" className="col-md-6" ref={numbersRef} />
          <ChooseFile label="Icon" className="col-md-6" ref={iconRef} />
          <div className="col-md-2 mt-3 ml-2">
            <button className="btn btn-primary w-100">Yaratish</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
