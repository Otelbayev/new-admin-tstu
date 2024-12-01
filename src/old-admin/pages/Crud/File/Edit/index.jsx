import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import {
  Input,
  ChooseFile,
  Select,
  Image,
} from "./../../../../components/Generics";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../../../context/Status/index";
import { useEdit } from "./../../../../hooks/useEdit";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const [status, setStatus] = useState(null);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);

  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      message.error("All files are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status_id", status);
    formData.append("url", fileRef?.current?.files[0] || file);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/files/updatefiles`,
      `${import.meta.env.VITE_BASE_URL_API}/files/updatefilestranslation`,
      [{ files_id: id }, { language_id }, { status_translation_id: status }],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
      [{ files_id: id }, { language_id }],
      ["status_id"]
    );
    res?.status === 200 && setIsCreate(false);
  };

  const getData = async () => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/files/getbyidfiles/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/files/getbyuzidfilestranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      setIsCreate(false);
      setTransId(res.data.id);
      setTitle(res.data?.title);
      setStatus(res.data?.status_?.id || res.data?.status_translation_?.id);
      setImg(res?.data?.url || res?.data?.files_?.url);
      setFile(res?.data?.url || res?.data?.files_?.url);
    } else {
      setIsCreate(true);
      setTransId(null);
      setTitle("");
      setImg(null);
      setFile(null);
    }
  };

  useEffect(() => {
    getData(value);
    getStatus(value);
  }, [value, isCreate]);

  useEffect(() => {
    if (isCreate) setFile(null);
  }, [isCreate]);

  return (
    <Wrapper title="Edit File">
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className={isCreate ? "col-md-6" : "col-md-4"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <ChooseFile
            label="File"
            className={isCreate ? "col-md-6" : "col-md-4"}
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {!isCreate && (
            <Image
              label="Img"
              img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
              className={"col-md-2"}
            />
          )}
          {!isCreate && (
            <Select
              label="Status"
              className={"col-md-2"}
              options={statusData}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          )}
          <div className="col-md-2 mt-3 ml-2">
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
