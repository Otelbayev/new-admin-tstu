import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect/index";
import { Input, Select } from "../../../components/Generics";
import { useSiteContext } from "../../../context/SiteContext";
import { useCreate } from "./../../../hooks/useCreate";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const navigate = useNavigate();

  const { siteTypeData, getSiteTypeData } = useSiteContext();
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [siteTypeId, setSiteTypeId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await useCreate(
      value,
      "obj",
      {
        title,
        description,
        site_type_id:
          value === "uz"
            ? siteTypeId
            : siteTypeData?.find((e) => e.value === siteTypeId)?.parent,
      },
      `${import.meta.env.VITE_BASE_URL_API}/site/createsite`,
      `${import.meta.env.VITE_BASE_URL_API}/site/createsitetranslation`,
      "site_id",
      [{ language_id }, { site_type_translation_id: siteTypeId }],
      ["site_type_id"]
    );

    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/site`);
  };

  useEffect(() => {
    getSiteTypeData(value);
  }, [value]);

  useEffect(() => {
    setSiteTypeId(siteTypeData[0]?.value);
  }, [siteTypeData]);

  return (
    <Wrapper title="Create Site">
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className="form-group col-md-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            className="form-group col-md-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            label="Site Type"
            className={"form-group col-md-4"}
            options={siteTypeData}
            value={siteTypeId}
            onChange={(e) => setSiteTypeId(e)}
          />
          <div className="form-group col-md-3 m-2">
            <button className="btn btn-primary w-100">Yaratish</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
