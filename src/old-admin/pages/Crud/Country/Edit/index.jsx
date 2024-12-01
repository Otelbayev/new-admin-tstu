import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import useAxios from "../../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Select } from "antd";
import { useStatusContext } from "../../../../context/Status";
import { useEdit } from "./../../../../hooks/useEdit";
import Wrapper from "../../../../components/Wrapper";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const [inputStyle, setInputStyle] = useState({});
  const [type, setType] = useState("");
  const token = Cookies.get("_token");
  const [status, setStatus] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const { id } = useParams();
  const [transId, setTransId] = useState(null);
  const { statusData, getStatus } = useStatusContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!type) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        title: type,
        status_id: status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/country/updatecountry`,
      `${import.meta.env.VITE_BASE_URL_API}/country/updatecountrytranslation`,
      [{ language_id }, { status_translation_id: status }, { country_id: id }],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/country/createcountrytranslation`,
      [{ language_id }, { country_id: id }],
      ["status_id"]
    );
    res.status === 200 && setIsCreate(false);
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
        value === "uz"
          ? setStatus(res?.data?.status_?.id)
          : setStatus(res?.data?.status_translation_?.id);
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
    getDataById(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/country/getbyidcountry/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/country/getbyuzidcountrytranslation/${id}?language_code=${value}`
    );
    getStatus(value);
  }, [value, isCreate]);

  return (
    <Wrapper title="Edit Counrty">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <div className="col-md-8">
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
                style={{ width: "100%" }}
                value={status}
                onChange={(e) => setStatus(e)}
                options={statusData}
              />
            </div>
          )}
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
