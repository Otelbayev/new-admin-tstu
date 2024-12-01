import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Editor, Input } from "../../components/Generics";
import { useLanguageContext } from "../../../context/LanguageContext";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useEdit } from "./../../hooks/useEdit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AdditionalsEdit = ({
  title,
  updUrl,
  updUrlTrans,
  byId,
  byIdTrans,
  createTrans,
  uzId,
}) => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const editorRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const { id } = useParams();

  const { options } = useLanguageContext();
  const language_id = options.find((option) => option.code === value)?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        title: titleRef.current.value,
        description: descRef.current.value,
        text: $(editorRef.current).summernote("code"),
      },
      `${import.meta.env.VITE_BASE_URL_API}${updUrl}`,
      `${import.meta.env.VITE_BASE_URL_API}${updUrlTrans}`,
      [{ [uzId]: Number(id) }, { language_id }],
      [],
      `${import.meta.env.VITE_BASE_URL_API}${createTrans}`,
      [{ [uzId]: Number(id) }, { language_id }]
    );

    if (res?.status === 200) {
      setIsCreate(false);
    }
  };

  const getData = async (id, value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}${byId}/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }${byIdTrans}/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.data.id !== 0) {
      titleRef.current.value = res.data?.title;
      descRef.current.value = res.data?.description;
      $(editorRef.current).summernote("code", res.data.text);
      setIsCreate(false);
      setTransId(res.data.id);
    } else {
      setTransId(null);
      setIsCreate(true);
      titleRef.current.value = "";
      descRef.current.value = "";
      $(editorRef.current).summernote("code", "");
    }
  };

  useEffect(() => {
    getData(id, value);
  }, [value, isCreate]);

  return (
    <Wrapper title={title}>
      <form className="form-horizontal row" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <Input
          ref={titleRef}
          className="form-group col-md-2"
          label={`Mavzu (${value})`}
        />
        <Input
          ref={descRef}
          className="form-group col-md-2"
          label={`Izoh (${value})`}
        />
        <Editor ref={editorRef} className="form-group col-md-8" />
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            {isCreate ? (
              <button type="submit" className="btn btn-success">
                Yaratish
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Yangilash
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdditionalsEdit;
