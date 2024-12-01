import React, { useEffect, useState } from "react";
import {
  ChooseFile,
  Editor,
  FileImg,
  Image,
  Input,
  Select,
  TextArea,
} from "../../../components/Generics";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useRef } from "react";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useStatusContext } from "../../../context/Status";
import { useEdit } from "../../../hooks/useEdit";
import Wrapper from "../../../components/Wrapper";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const { id } = useParams();
  const { sendRequest } = useAxios();

  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;

  const editorRef = useRef(null);
  const imgRef = useRef();

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(1);
  const [img, setImg] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const [upd, setUpd] = useState({});

  const getData = async (value) => {
    const response = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/page/getbyidpage/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/page/getbyuzidpagetranslation/${id}?language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (response.status === 200) {
      setIsCreate(false);
      setTransId(response?.data?.id);
      setTitle(response?.data?.title);
      setShort(response?.data?.title_short);
      $(editorRef.current).summernote("code", response?.data?.text);
      setDesc(response?.data?.description);
      setImg(response?.data?.img_?.url || response.data?.img_translation_?.url);
      setStatus(
        response?.data?.status_?.id || response?.data?.status_translation_?.id
      );
    } else {
      setIsCreate(true);
      setDesc("");
      setShort("");
      setTitle("");
      setImg(null);
      $(editorRef.current)?.summernote("code", null);
    }
  };

  useEffect(() => {
    getData(value);
    getStatus(value);
  }, [value, isCreate, upd]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_short", short);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("text", $(editorRef.current)?.summernote("code") || null);
    formData.append("status_id", status);
    formData.append("position", 1);
    formData.append("favorite", false);
    formData.append("img_up", imgRef?.current?.files[0]);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/page/updatepage`,
      `${import.meta.env.VITE_BASE_URL_API}/page/updatepagetranslation`,
      [{ page_id: id }, { language_id }, { status_translation_id: status }],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/page/createpagetranslation`,
      [{ page_id: id }, { language_id }]
    );

    if (res?.status === 200) {
      setUpd({ name: "test" });
      setIsCreate(false);
    }
  };

  return (
    <Wrapper title={"Edit Page"}>
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Title (${value})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Short Title (${value})`}
          value={short}
          onChange={(e) => setShort(e.target.value)}
        />
        <Editor
          className="form-group col-md-6 card-header"
          lan={value}
          ref={editorRef}
        />
        <TextArea
          className="form-group col-md-6 card-header"
          label={`Description (${value})`}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <FileImg
          className="form-group col-md-6"
          lan={value}
          editorRef={editorRef}
        />
        {
          <Select
            label="Status"
            className="col-md-3"
            options={statusData}
            value={status}
            onChange={(e) => setStatus(Number(e))}
          />
        }
        <ChooseFile
          label="Image"
          className={"form-group col-md-3"}
          ref={imgRef}
        />
        {!isCreate && (
          <Image
            label="Image"
            className="col-md-3"
            img={`${import.meta.env.VITE_BASE_URL_IMG}${img}`}
          />
        )}
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            {isCreate ? (
              <button type="submit" className="btn btn-success">
                Create
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
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
