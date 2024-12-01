import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import useAxios from "../../../../../hooks/useAxios";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Select, Input } from "../../../../components/Generics";
import { useEdit } from "./../../../../hooks/useEdit";
import Wrapper from "../../../../components/Wrapper";

const Edit = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const [type, setType] = useState("");
  const token = Cookies.get("_token");
  const [status, setStatus] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const { id } = useParams();
  const [transId, setTransId] = useState(null);
  const [name, setName] = useState("");
  const [nameStyle, setNameStyle] = useState({});

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setNameStyle({ border: "1px solid red" });
      return;
    }

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        status: type,
        name,
        is_deleted: status,
      },
      `${import.meta.env.VITE_BASE_URL_API}/status/updatestatus`,
      `${import.meta.env.VITE_BASE_URL_API}/status/updatestatustranslation`,
      [{ language_id }, { status_id: Number(id) }],
      [],
      `${import.meta.env.VITE_BASE_URL_API}/status/createstatustranslation`,
      [{ language_id }, { status_id: Number(id) }],
      ["is_deleted"]
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
        setIsCreate(false);
        setType(res?.data?.status);
        setTransId(res?.data?.id);
        setStatus(res?.data?.is_deleted);
        setName(res?.data?.name);
      } else {
        setIsCreate(true);
        setType("Active");
        setStatus(null);
        setName("");
      }
    } catch (err) {
      setIsCreate(true);
    }
  };

  useEffect(() => {
    getDataById(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/status/getbyidstatus/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/status/getbyiduzstatustranslation/${id}?language_code=${value}`
    );
  }, [value, isCreate]);

  return (
    <Wrapper title="Edit Status">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <Input
            className={isCreate ? "col-md-6" : "col-md-4"}
            placeholder="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={nameStyle}
            onFocus={() => setNameStyle(null)}
          />
          <Select
            label="Status"
            className={isCreate ? "col-md-6" : "col-md-4"}
            value={type}
            onChange={(e) => setType(e)}
            options={[
              { value: "Active", label: "Active" },
              { value: "Deleted", label: "Deleted" },
            ]}
          />
          {!isCreate && (
            <div className="col-md-4">
              <Select
                style={{ width: "100%" }}
                value={status}
                label="IS Deleted"
                onChange={(e) => setStatus(e)}
                options={[
                  { value: true, label: "true" },
                  { value: false, label: "false" },
                ]}
              />
            </div>
          )}

          {isCreate ? (
            <button type="submit" className="btn col-md-3 m-3 btn-success">
              Create
            </button>
          ) : (
            <button type="submit" className="btn col-md-2 m-3 btn-primary">
              Update
            </button>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
