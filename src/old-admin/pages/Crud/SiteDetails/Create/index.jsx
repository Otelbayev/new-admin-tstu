import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { ChooseFile, Input, Select } from "../../../../components/Generics";
import { useSiteContext } from "../../../../context/SiteContext";
import { useCreate } from "./../../../../hooks/useCreate";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [socials, setSocials] = useState("");
  const [details, setDetails] = useState("");
  const [siteId, setSiteId] = useState(null);

  const logo_w_Ref = useRef(null);
  const logo_b_Ref = useRef(null);
  const faviconRef = useRef(null);

  const { siteData, getSiteData } = useSiteContext();
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();

  const language_id = options?.find((e) => e?.code === value)?.id;

  const handleChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("socials", socials);
    formData.append("details", details);
    value === "uz"
      ? formData.append("site_id", siteId)
      : formData.append(
          "site_id",
          siteData.find((e) => e.value === siteId)?.parent
        );
    formData.append("logo_w_up", logo_w_Ref?.current?.files[0] || null);
    formData.append("logo_b_up", logo_b_Ref?.current?.files[0] || null);
    formData.append("favicon_up", faviconRef?.current?.files[0] || null);

    const res = await useCreate(
      value,
      "formData",
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/sitedetail/createsitedetail`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/sitedetail/createsitedetailtranslation`,
      "site_detail_id",
      [{ language_id }, { site_translation_id: siteId }],
      ["site_id"]
    );

    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/site-details`);
  };

  useEffect(() => {
    getSiteData(value);
  }, [value]);

  useEffect(() => {
    setSiteId(siteData[0]?.value);
  }, [siteData]);

  return (
    <Wrapper title="Create Site Details">
      <form onSubmit={handleChange}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            className="col-md-6 form-group"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="col-md-6 form-group"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            className="col-md-6 form-group"
            label="Socials"
            value={socials}
            onChange={(e) => setSocials(e.target.value)}
          />
          <Input
            className="col-md-6 form-group"
            label="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Select
            className={"col-md-3 form-group"}
            label="Site id"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            options={siteData}
          />
          <ChooseFile
            className="col-md-3 form-group"
            label="logo_w_up"
            ref={logo_w_Ref}
          />
          <ChooseFile
            className="col-md-3 form-group"
            label="logo_b_up"
            ref={logo_b_Ref}
          />
          <ChooseFile
            className="col-md-3 form-group"
            label="favicon_up"
            ref={faviconRef}
          />
          <div className="col-md-3 m-2">
            <button className="btn btn-primary w-100">Yaratish</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
