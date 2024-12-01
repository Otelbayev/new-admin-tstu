import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { ChooseFile, Input, Select } from "../../../../components/Generics";
import { useSiteContext } from "../../../../context/SiteContext";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import { useStatusContext } from "./../../../../context/Status/index";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../../hooks/useEdit";
import Wrapper from "../../../../components/Wrapper";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const { id } = useParams();

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
  const { statusData, getStatus } = useStatusContext();

  const language_id = options?.find((e) => e?.code === value)?.id;

  const [isCreate, setIsCreate] = useState(false);
  const [status, setStatus] = useState(null);
  const [transId, setTransId] = useState(null);

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
    formData.append("status_id", status);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/sitedetail/updatesitedetail`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/sitedetail/updatesitedetailtranslation`,
      [
        { site_detail_id: id },
        { language_id },
        { site_translation_id: siteId },
        { status_translation_id: status },
      ],
      ["site_id", "status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/sitedetail/createsitedetailtranslation`,
      [
        { language_id },
        { site_detail_id: id },
        { site_translation_id: siteId },
      ],
      ["site_id"]
    );

    res?.status === 200 && setIsCreate(false);
  };

  const getData = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/sitedetail/getbyidsitedetail/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/sitedetail/getbyuzidsitedetailtranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setTransId(res?.data?.id);
      setTitle(res?.data?.title);
      setDescription(res?.data?.description);
      setSocials(res?.data?.socials);
      setDetails(res?.data?.details);
      setSiteId(res?.data?.site_?.id || res?.data?.site_translation_?.id);
      setStatus(res?.data?.status_?.id || res?.data?.status_translation_?.id);
      setIsCreate(false);
    } else {
      setIsCreate(true);
      setTransId(null);
      setTitle("");
      setDescription("");
      setSocials("");
      setDetails("");
      setSiteId(null);
      setStatus(null);
    }
  };

  useEffect(() => {
    getData(value, id);
    getSiteData(value);
    getStatus(value);
  }, [value, isCreate]);

  useEffect(() => {
    setSiteId(siteData[0]?.value);
  }, [siteData]);

  return (
    <Wrapper title="Edit Site Details">
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
            className="col-md-4 form-group"
            label="Socials"
            value={socials}
            onChange={(e) => setSocials(e.target.value)}
          />
          <Input
            className="col-md-4 form-group"
            label="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Select
            className={"col-md-4 form-group"}
            label="Site id"
            value={siteId}
            onChange={(e) => setSiteId(e)}
            options={siteData}
          />
          <ChooseFile
            className={`${isCreate ? "col-md-4" : "col-md-3"} form-group`}
            label="logo_w_up"
            ref={logo_w_Ref}
          />
          <ChooseFile
            className={`${isCreate ? "col-md-4" : "col-md-3"} form-group`}
            label="logo_b_up"
            ref={logo_b_Ref}
          />
          <ChooseFile
            className={`${isCreate ? "col-md-4" : "col-md-3"} form-group`}
            label="favicon_up"
            ref={faviconRef}
          />
          {!isCreate && (
            <Select
              className={"col-md-3 form-group"}
              label="Status"
              options={statusData}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          )}
          <div className="col-md-3 m-2">
            {isCreate ? (
              <button className="btn btn-success w-100">Yaratish</button>
            ) : (
              <button className="btn btn-primary w-100">Yangilash</button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
