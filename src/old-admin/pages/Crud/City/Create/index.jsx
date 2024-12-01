import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { message, Select } from "antd";
import useAxios from "../../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocationContext } from "../../../../context/LocationContext";
import Wrapper from "../../../../components/Wrapper";

const Create = () => {
  const [value, setValue] = useState("uz");
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const navigate = useNavigate();

  const { options } = useLanguageContext();
  const { countryData, getSelectCountry, regionData, getSelectRegion } =
    useLocationContext();

  const language_id = options.find((e) => e.code === value)?.id;

  const [titleValue, setTitleValue] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const [country, setCountry] = useState(1);
  const [region, setRegion] = useState(regionData[0]?.value);
  const [isOther, setIsOther] = useState(false);

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
        url: `${import.meta.env.VITE_BASE_URL_API}/district/createdistrict`,
        data: {
          title: titleValue,
          territorie_id: region,
        },
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await sendRequest(baseRequest);
      if (res.status === 200 && value !== "uz") {
        await sendRequest({
          method: "post",
          url: `${
            import.meta.env.VITE_BASE_URL_API
          }/district/createdistricttranslation`,
          data: {
            title: titleValue,
            language_id,
            district_id: res?.data?.id,
            status_translation_id: 1,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      message.success({ key: "key", content: "Muvaffaqiyatli!" });
      // navigate(`/${language}/admin/city`);
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

  useEffect(() => {
    getSelectRegion(value, country);
  }, [value, country]);

  return (
    <Wrapper title="Create City">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <div className="col-md-6">
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
              value={country}
              onChange={(e) => {
                if (e === 2) {
                  setIsOther(true);
                } else {
                  setIsOther(false);
                }
                setCountry(e);
              }}
            />
          </div>
          {!isOther && (
            <div className="col-md-2">
              <Select
                style={{ width: "100%", height: "38px" }}
                options={regionData}
                value={region ? region : regionData[0]?.value}
                onChange={(e) => setRegion(e)}
              />
            </div>
          )}
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
