import React, { useRef, useState } from "react";
import { message } from "antd";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ChooseFile, Input } from "../../../../components/Generics";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const [titleStyle, setTitleStyle] = useState({});

  const shortRef = useRef(null);
  const [shortStyle, setShortStyle] = useState({});

  const codeRef = useRef(null);
  const [codeStyle, setCodeStyle] = useState({});

  const descRef = useRef(null) || null;
  const detailRef = useRef(null) || null;
  const iconRef = useRef(null) || null;

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (!titleRef.current.value) {
      setTitleStyle({ border: "1px solid red" });
      return;
    }
    if (!shortRef.current.value) {
      setShortStyle({ border: "1px solid red" });
      return;
    }
    if (!codeRef.current.value) {
      setCodeStyle({ border: "1px solid red" });
      return;
    }

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("title_short", shortRef.current.value);
    formData.append("code", codeRef.current.value);
    formData.append("description", descRef.current.value || null);
    formData.append("details", detailRef.current.value || null);
    formData.append("img_upload", iconRef.current.files[0] || null);

    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/language/createlanguage`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await sendRequest(baseRequest);
      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Language created successfully",
        });
        navigate(`/${i18n.language}/admin/language`);
      }
    } catch (error) {
      message.error({ key: "key", content: error.message });
    }
  };

  return (
    <Wrapper title="Create Language">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <Input
            className="col-md-4"
            ref={titleRef}
            label="Title"
            style={titleStyle}
            onFocus={() => setTitleStyle({})}
          />
          <Input
            className="col-md-4"
            ref={shortRef}
            label="Short Title"
            style={shortStyle}
            onFocus={() => setShortStyle({})}
          />
          <Input
            className="col-md-4"
            ref={codeRef}
            style={codeStyle}
            label="Code"
            onFocus={() => setCodeStyle({})}
          />
        </div>
        <div className="row">
          <Input className="col-md-4" ref={descRef} label="Description" />
          <Input className="col-md-4" ref={detailRef} label="Details" />
          <ChooseFile className="col-md-4" ref={iconRef} label="Icon" />
        </div>
        <div className="row">
          <div className="col-md-3 m-2">
            <button type="submit" className="btn w-100 btn-success">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
