import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect/index";
import { Input, Select } from "../../../components/Generics";
import { useSiteContext } from "../../../context/SiteContext";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../../context/Status/index";
import { useEdit } from "./../../../hooks/useEdit";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { siteTypeData, getSiteTypeData } = useSiteContext();
  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [siteTypeId, setSiteTypeId] = useState(null);
  const [status, setStatus] = useState(null);
  const [transId, setTransId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        title,
        description,
        status_id: status,
        site_type_id: siteTypeId,
      },
      `${import.meta.env.VITE_BASE_URL_API}/site/updatesite`,
      `${import.meta.env.VITE_BASE_URL_API}/site/updatesitetranslation`,
      [
        { language_id },
        { status_translation_id: status },
        { site_type_translation_id: siteTypeId },
        { site_id: id },
      ],
      ["status_id", "site_type_id"],
      `${import.meta.env.VITE_BASE_URL_API}/site/createsitetranslation`,
      [
        { language_id },
        { site_id: id },
        { site_type_translation_id: siteTypeId },
      ],
      ["site_type_id", "status_id"]
    );

    res?.status === 200 && navigate(`/${i18n.language}/admin/site`);
  };

  const getData = async () => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/site/getbyidsite/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/site/getbyuzidsitetranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setTitle(res?.data?.title);
      setDescription(res?.data?.description);
      setSiteTypeId(
        res?.data?.site_type_.id || res?.data?.site_type_translation_.id
      );
      setStatus(res?.data?.status_.id || res?.data?.status_translation_.id);
      setIsCreate(false);
      setTransId(res?.data?.id);
    } else {
      setIsCreate(true);
      setTitle("");
      setDescription("");
      setSiteTypeId(null);
      setStatus(null);
      setTransId(null);
    }
  };

  useEffect(() => {
    getSiteTypeData(value);
    getData(value, id);
    getStatus(value);
  }, [value]);

  useEffect(() => {
    setSiteTypeId(siteTypeData[0]?.value);
  }, [siteTypeData]);

  return (
    <Wrapper title="Edit Site">
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className={`form-group ${isCreate ? "col-md-4" : "col-md-3"}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            className={`form-group ${isCreate ? "col-md-4" : "col-md-3"}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            label="Site Type"
            className={`form-group ${isCreate ? "col-md-4" : "col-md-3"}`}
            options={siteTypeData}
            value={siteTypeId}
            onChange={(e) => setSiteTypeId(e)}
          />
          {!isCreate && (
            <Select
              label="Status"
              className={"form-group col-md-3"}
              options={statusData}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          )}
          <div className="form-group col-md-3 m-2">
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
