import React, { useEffect, useRef, useState } from "react";
import {
  TextArea,
  Editor,
  FileImg,
  Select,
  ChooseFile,
  Image,
} from "../../components/Generics";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { message } from "antd";

const ProfileDep = () => {
  const { sendRequest } = useAxios();
  const [value, setValue] = useState("uz");

  const imgRef = useRef(null);
  const img2Ref = useRef(null);
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [desc, setDesc] = useState("");
  const [favo, setFavo] = useState(1);
  const [img, setImg] = useState(null);
  const [icon, setIcon] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    message.loading({ key: "msg", content: "Yangilanmoqda..." });
    const formData = new FormData();
    formData.append("title_short", short);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("text", $(editorRef.current)?.summernote("code") || null);
    formData.append("favorite", favo);
    formData.append("img_up", imgRef.current?.files[0] || null);
    formData.append("img_icon_up", img2Ref.current?.files[0] || null);

    if (value !== "uz") {
      formData.append("language_code", value);
    }

    const res = await axios.put(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/updatedepartamentheaddep`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/updatedepartamenttranslationheaddep/${value}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      message.success({ key: "msg", content: "Muvofaqiyatli yangiladi!" });
    } else {
      message.error({ key: "msg", content: "Xatolik!" });
    }
  };

  const getData = async (value) => {
    const res = await sendRequest({
      methos: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/getbydepartamentheaddep`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/getbydepartamenttranslationheaddep/${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    if (res.status === 200) {
      setTitle(res.data?.title || "");
      setShort(res.data?.title_short || "");
      setDesc(res.data?.description || "");
      setImg(res.data?.img_?.url || res.data?.img_translation_?.url);
      $(editorRef.current)?.summernote("code", `${res?.data?.text || ""}`);
      setIcon(res.data?.img_icon_?.url || res.data?.img_icon_translation_?.url);
      setFavo(res.data.favorite);
    }
  };

  useEffect(() => {
    getData(value);
  }, [value]);

  return (
    <Wrapper title="Bo'lim ma'lumotlari">
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-3"
          label={`Title (${value})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          className="form-group col-md-3"
          label={`Short Title (${value})`}
          value={short}
          onChange={(e) => setShort(e.target.value)}
        />
        <TextArea
          className="form-group col-md-6"
          label={`Description (${value})`}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {value === "uz" && (
          <Select
            className={`form-group col-md-2`}
            label="Favorite"
            options={[
              { value: true, label: "true" },
              { value: false, label: "false" },
            ]}
            onChange={(e) => setFavo(e)}
            value={favo}
          />
        )}

        <ChooseFile
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Image"
          ref={imgRef}
        />
        <Image
          className={"form-group col-md-2"}
          img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
          label={"Image"}
          alt="none"
        />
        <ChooseFile
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Icon"
          ref={img2Ref}
        />
        <Image
          className={"form-group col-md-2"}
          img={`${import.meta.env.VITE_BASE_URL_IMG}${icon}`}
          label={"Icon"}
          alt="none"
        />

        <Editor className="form-group col-md-6" lan={value} ref={editorRef} />
        <FileImg
          className="form-group col-md-6"
          lan={value}
          editorRef={editorRef}
        />
        <div className="form-group col-md-12">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary">
              Yangilash
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProfileDep;
