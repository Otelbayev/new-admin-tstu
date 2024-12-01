import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import LanguageSelect from "./../../../components/Generics/LanguageSelect";
import { ChooseFile, Image, Input, Select } from "../../../components/Generics";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useStatusContext } from "./../../../context/Status";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEdit } from "./../../../hooks/useEdit";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);

  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [icon, setIcon] = useState(null);
  const [status, setStatus] = useState(null);
  const [transId, setTransId] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("url_", url);
    formData.append("img_up", img);
    formData.append("icon_up", icon);
    formData.append("status_id", status);
    formData.append("favorite", favorite);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/updateinteractiveservices`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/updateinteractiveservicestranslation`,
      [
        { interactive_services_id: id },
        { language_id },
        { status_translation_id: status },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/createinteractiveservicestranslation`,
      [{ interactive_services_id: id }, { language_id }],
      ["status_id"]
    );
    res?.status === 200 && setIsCreate(false);
  };

  const getDataId = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/getbyidinteractiveservices/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/getbyuzidinteractiveservicestranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      setIsCreate(false);
      setTitle(res.data?.title);
      setDescription(res.data?.description);
      setImg(res.data?.img_?.url || res.data?.img_translation_?.url);
      setUrl(res.data?.url_);
      setIcon(res.data?.icon_?.url);
      setStatus(res.data?.status_?.id || res.data?.status_translation_?.id);
      setTransId(res.data?.id);
      setFavorite(res.data?.favorite);
    } else {
      setIsCreate(true);
      setTransId(null);
      setTitle("");
      setDescription("");
      setImg(null);
      setUrl("");
      setIcon(null);
      setStatus(null);
      setFavorite(false);
    }
  };

  useEffect(() => {
    getStatus(value);
    getDataId(value, id);
  }, [value, isCreate]);

  return (
    <Wrapper title="Create Interactive Services">
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className={isCreate ? "col-md-4" : "col-md-3"}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            className={isCreate ? "col-md-4" : "col-md-3"}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Url"
            className={isCreate ? "col-md-4" : "col-md-3"}
            value={url || ""}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Select
            className={isCreate ? "col-md-4" : "col-md-3"}
            label="Favorite"
            value={favorite}
            onChange={(e) => setFavorite(e)}
            options={[
              { value: true, label: "true" },
              { value: false, label: "false" },
            ]}
          />
          <ChooseFile
            label="Image"
            className={isCreate ? "col-md-4" : "col-md-3"}
            onChange={(e) => setImg(e.target.files[0])}
          />
          {!isCreate && (
            <Image
              img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
              className="col-md-2"
            />
          )}
          <ChooseFile
            label="Icon"
            className={isCreate ? "col-md-4" : "col-md-3"}
            onChange={(e) => setIcon(e.target.files[0])}
          />
          {!isCreate && (
            <Image
              img={`${import.meta.env.VITE_BASE_URL_IMG}${icon}`}
              className="col-md-2"
            />
          )}
          {!isCreate && (
            <Select
              label="Status"
              className="col-md-2"
              options={statusData}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          )}
          <div className="col-md-12 mt-4 ml-2">
            {isCreate ? (
              <button className="btn btn-success">Yaratish</button>
            ) : (
              <button className="btn btn-primary">Yangilash</button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
