import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { message, Select } from "antd";
import useAxios from "../../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocationContext } from "../../../../context/LocationContext";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const { i18n } = useTranslation();
  const language_id = options.find((e) => e.code === value)?.id;
  const [titleValue, setTitleValue] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const [country_id, setCountry_id] = useState(1);
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const { countryData, getSelectCountry } = useLocationContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!titleValue) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/territorie/createterritorie`,
        data: {
          title: titleValue,
          country_id,
        },
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await sendRequest(baseRequest);
      if (res.status === 200 && value !== "uz") {
        await sendRequest({
          method: "post",
          url: `${
            import.meta.env.VITE_BASE_URL_API
          }/territorie/createterritorietranslation`,
          data: {
            title: titleValue,
            language_id,
            territorie_id: res?.data?.id,
            country_translation_id: country_id,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      message.success({ key: "key", content: "Muvaffaqiyatli!" });
      navigate(`/${i18n.language}/admin/region`);
    } catch (err) {
      message.error({
        key: "key",
        content: `Error: ${err.message || "Failed to create"}`,
      });
    }
  };

  useEffect(() => {
    getSelectCountry(value);
  }, [value]);

  return (
    <Wrapper title="Create Region">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={(e) => setTitleValue(e.target.value)}
              style={inputStyle}
              value={titleValue}
              onFocus={() => setInputStyle(null)}
            />
          </div>
          <div className="col-md-2">
            <Select
              style={{ width: "100%", height: "38px" }}
              options={countryData}
              value={country_id}
              onChange={(e) => setCountry_id(e)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn w-100 btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
