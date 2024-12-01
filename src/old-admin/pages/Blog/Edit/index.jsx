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
import { useBlogContext } from "../../../context/BlogContext";
import { useEdit } from "./../../../hooks/useEdit";
import Wrapper from "../../../components/Wrapper";
import { useStatusContext } from "./../../../context/Status/index";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const { id } = useParams();
  const { sendRequest } = useAxios();
  const role = Cookies.get("role");

  const { options } = useLanguageContext();
  const { blogCategoryOptions, getBlogCategorySelect } = useBlogContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;

  const editorRef = useRef(null);
  const imgRef = useRef(null);

  const [position, setPosition] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(1);
  const [img, setImg] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);
  const [blogValue, setBlogValue] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const getData = async (value) => {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/${
              role === "admin" ? "getbyidblog" : "sitegetbyidblog"
            }/${id}`
          : `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/${
              role === "admin"
                ? "getbyuzidblogtranslation"
                : "sitegetbyuzidblogtranslation"
            }/${id}?language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (res.status === 200) {
      setIsCreate(false);

      if (value === "uz") {
        setPosition(res?.data?.position);
        setFavorite(res?.data?.favorite);
        setDate1(res.data?.event_date?.split("T")[0] || "2004-04-16");
        setDate2(res.data?.event_end_date?.split("T")[0] || "2004-04-16");
        setBlogValue(res?.data?.blog_category_?.id);
      }
      setTransId(res?.data?.id);
      setTitle(res?.data?.title);
      setShort(res?.data?.title_short);
      setDesc(res?.data?.description);
      $(editorRef.current)?.summernote("code", res?.data?.text);
      setStatus(res?.data?.status_?.id || res?.data?.status_translation_?.id);
      setImg(res?.data?.img_?.url || res?.data?.img_translation_?.url);
    } else {
      setIsCreate(true);
      setTransId(null);
      setTitle("");
      setShort("");
      setDesc("");
      $(editorRef.current)?.summernote("code", "");
      setStatus(null);
      setImg(null);
    }
  };

  useEffect(() => {
    getBlogCategorySelect(value);
    getData(value);
    if (role === "admin") {
      getStatus(value);
    }
  }, [value, isCreate]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_short", short);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("text", $(editorRef.current)?.summernote("code") || null);
    if (role === "admin") {
      formData.append("status_id", status);
    }
    formData.append("position", position);
    formData.append("favorite", favorite);
    formData.append("img_up", imgRef.current?.files[0] || null);
    formData.append("blog_category_id", blogValue);
    formData.append(
      "event_date",
      `${date1}T19:00:00Z` || "2024-01-01T19:00:00Z"
    );
    formData.append(
      "event_end_date",
      `${date2}T19:00:00Z` || "2024-01-01T19:00:00Z"
    );

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/updateblog${
        role !== "admin" ? "moderatorcontent" : ""
      }`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/updateblogtranslation${
        role !== "admin" ? "moderatorcontent" : ""
      }`,
      [
        { blog_id: id },
        { language_id },
        { status_translation_id: status },
        {
          blog_category_translation_id: blogCategoryOptions?.find(
            (e) => e?.parent === blogValue
          )?.value,
        },
      ],
      ["blog_category_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/createblogtranslation`,
      [
        { language_id },
        { blog_id: id },
        {
          blog_category_translation_id: blogCategoryOptions?.find(
            (e) => e?.parent === blogValue
          )?.value,
        },
      ],
      ["blog_category_id"]
    );

    res?.status === 200 && setIsCreate(false);
  };

  return (
    <Wrapper title="Edit Blog">
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <TextArea
          className="form-group col-md-4 card-header"
          label={`Title (${value})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          className="form-group col-md-4 card-header"
          label={`Short Title (${value})`}
          value={short}
          onChange={(e) => setShort(e.target.value)}
        />
        <TextArea
          className="form-group col-md-4 card-header"
          label={`Description (${value})`}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Editor className="form-group col-md-6" lan={value} ref={editorRef} />
        <FileImg
          className="form-group col-md-6"
          lan={value}
          editorRef={editorRef}
        />
        {value === "uz" && (
          <Input
            label="Event date"
            type="date"
            className="form-group col-md-3"
            value={date1 || ""}
            onChange={(e) => setDate1(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            label="Event end date"
            type="date"
            className="form-group col-md-3"
            value={date2 || ""}
            onChange={(e) => setDate2(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Select
            label="Blog Ctegory"
            className={isCreate ? "form-group col-md-3" : "form-group col-md-3"}
            value={blogValue}
            onChange={(e) => setBlogValue(e)}
            options={blogCategoryOptions}
          />
        )}
        {value === "uz" && (
          <Input
            label="Position"
            className={isCreate ? "form-group col-md-3" : "form-group col-md-3"}
            value={position || ""}
            onChange={(e) => setPosition(e.target.value)}
            type="number"
          />
        )}
        {value === "uz" && (
          <Select
            label="Favorite"
            className={isCreate ? "form-group col-md-3" : "form-group col-md-4"}
            options={[
              { value: true, label: "true" },
              { value: false, label: "false" },
            ]}
            value={favorite}
            onChange={(e) => setFavorite(e)}
          />
        )}
        {role === "admin" && !isCreate && (
          <Select
            label="Status"
            className="col-md-4"
            options={statusData}
            value={status}
            onChange={(e) => setStatus(Number(e))}
          />
        )}
        <ChooseFile
          label="Image"
          className={
            value === "uz"
              ? "form-group col-md-4"
              : isCreate
              ? "form-group col-md-6"
              : "form-group col-md-4"
          }
          ref={imgRef}
        />
        {!isCreate && (
          <Image
            label="Image"
            className="col-md-4"
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
