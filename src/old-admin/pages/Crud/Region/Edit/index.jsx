import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import useAxios from "../../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Select, message } from "antd";
import { useStatusContext } from "../../../../context/Status";
import { useLocationContext } from "./../../../../context/LocationContext/";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const { id } = useParams();

  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const { statusData, getStatus } = useStatusContext();
  const { countryData, getSelectCountry } = useLocationContext();

  const language_id = options.find((e) => e.code === value)?.id;

  const [inputStyle, setInputStyle] = useState({});
  const [type, setType] = useState("");
  const [status, setStatus] = useState(null);
  const [country, setCountry] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!type) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    if (!isCreate) {
      try {
        const res = await sendRequest({
          method: "put",
          url:
            value === "uz"
              ? `${
                  import.meta.env.VITE_BASE_URL_API
                }/territorie/updateterritorie/${id}`
              : `${
                  import.meta.env.VITE_BASE_URL_API
                }/territorie/updateterritorietranslation/${transId}`,
          data:
            value === "uz"
              ? {
                  title: type,
                  country_id: country,
                  status_id: status,
                }
              : {
                  title: type,
                  language_id,
                  status_translation_id: status,
                  territorie_id: id,
                  country_translation_id: country,
                },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          message.success({
            key: "key",
            content: "Updated successfully",
            duration: 2,
          });
          navigate(`/${i18n.language}/admin/region`);
        }
      } catch (err) {
        message.error({
          key: "key",
          content: "Error",
          duration: 2,
        });
      }
    } else {
      try {
        const res = await sendRequest({
          method: "post",
          url: `${import.meta.env.VITE_BASE_URL_API}/territorie/createterritorietranslation`,
          data: {
            title: type,
            language_id,
            territorie_id: id,
            country_translation_id: country,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          message.success({
            key: "key",
            content: "Created successfully",
            duration: 2,
          });
          navigate(`/${i18n.language}/admin/region`);
        }
      } catch (err) {
        message.error({
          key: "key",
          content: "Error",
          duration: 2,
        });
      }
    }
  };
  const getDataById = async (urlId) => {
    try {
      const res = await sendRequest({
        method: "get",
        url: urlId,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setType(res?.data?.title);
        setTransId(res?.data?.id);
        if (value === "uz") {
          setStatus(res?.data?.status_?.id);
          setCountry(res?.data?.country_?.id);
        } else {
          setStatus(res?.data?.status_translation_?.id);
          setCountry(res?.data?.country_translation_?.id);
        }
      }
      if (res.status === 204) {
        throw new Error();
      }
      setIsCreate(false);
    } catch (err) {
      setIsCreate(true);
      setType("");
      setStatus(null);
    }
  };

  useEffect(() => {
    isCreate && setCountry(null);
    getStatus(value);
    getSelectCountry(value);
    value === "uz"
      ? getDataById(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/getbyidterritorie/${id}`
        )
      : getDataById(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/getbyuzidterritorietranslation/${id}?language_code=${value}`
        );
  }, [value]);

  return (
    <Wrapper title="Edit Region">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={inputStyle}
              onFocus={() => setInputStyle(null)}
            />
          </div>
          {!isCreate && (
            <div className="col-md-2">
              <Select
                style={{ width: "100%", height: "38px" }}
                value={isCreate ? statusData[0].value : status}
                onChange={(e) => setStatus(e)}
                options={statusData}
              />
            </div>
          )}
          <div className="col-md-2">
            <Select
              style={{ width: "100%", height: "38px" }}
              value={isCreate ? countryData[0].value : country}
              onChange={(e) => setCountry(e)}
              options={countryData}
            />
          </div>
          <div className="col-md-2">
            {isCreate ? (
              <button type="submit" className="btn w-100 btn-success">
                Create
              </button>
            ) : (
              <button type="submit" className="btn w-100 btn-primary">
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
