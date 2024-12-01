import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChooseFile,
  Image,
  Input,
  Select,
} from "../../../../components/Generics";
import { useStatusContext } from "./../../../../context/Status/index";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const { i18n } = useTranslation();

  const { id } = useParams();

  const titleRef = useRef(null);
  const [titleStyle, setTitleStyle] = useState({});

  const shortRef = useRef(null);
  const [shortStyle, setShortStyle] = useState({});

  const codeRef = useRef(null);
  const [codeStyle, setCodeStyle] = useState({});

  const descRef = useRef(null) || null;
  const detailRef = useRef(null) || null;
  const iconRef = useRef(null) || null;

  const { statusData, getStatus } = useStatusContext();

  const [img, setImg] = useState(null);

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
    formData.append("status_id", status);

    try {
      message.loading({ key: "key", content: "Loading..." });

      const baseRequest = {
        method: "put",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/language/updatelanguage/${id}`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await sendRequest(baseRequest);
      if (res.status === 200) {
        message.success({
          key: "key",
          content: "Language updated successfully",
        });

        navigate(`/${i18n.language}/admin/language`);
      }
    } catch (error) {
      message.error({ key: "key", content: error.message });
    }
  };

  useEffect(() => {
    async function getByID() {
      const res = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/language/getbyidlanguage/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        titleRef.current.value = res?.data?.title;
        shortRef.current.value = res?.data?.title_short;
        codeRef.current.value = res?.data?.code;
        descRef.current.value = res?.data?.description;
        detailRef.current.value = res?.data?.details;
        setStatus(res?.data?.status_.id);
        setImg(res?.data?.img_?.url);
      }
    }
    getStatus("uz");
    getByID();
  }, []);

  return (
    <Wrapper title="Edit Language">
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
          <Select
            className="col-md-4"
            label="Status"
            options={statusData}
            value={status}
            onChange={(e) => setStatus(e)}
          />
        </div>
        <div className="row">
          <ChooseFile className="col-md-4" ref={iconRef} label="Icon" />
          <Image
            className="col-md-4"
            label="Image"
            img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
          />
        </div>
        <div className="row">
          <div className="col-md-3 m-2">
            <button type="submit" className="btn w-100 btn-success">
              Update
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
