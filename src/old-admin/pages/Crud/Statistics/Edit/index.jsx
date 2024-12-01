import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import LanguageSelect from "./../../../../components/Generics/LanguageSelect";
import {
  ChooseFile,
  Image,
  Input,
  Select,
} from "../../../../components/Generics";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "./../../../../hooks/useEdit";
import { useStatusContext } from "../../../../context/Status";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numbers, setNumbers] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState(null);

  const { options } = useLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();
  const iconRef = useRef(null);

  const getData = async (value, id) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/statisticalnumbers/getbyidstatisticalnumbers/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/statisticalnumbers/getbyuzidstatisticalnumberstranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setTransId(res?.data?.id);
      setTitle(res?.data?.title);
      setDescription(res?.data?.description);
      setStatus(res.data?.status_?.id || res.data?.status_translation_?.id);
      setNumbers(res?.data?.numbers);
      setIcon(res?.data?.icon_?.url);
      setIsCreate(false);
    } else {
      setIsCreate(true);
      setTransId(null);
      setStatus(null);
      setTitle("");
      setDescription("");
      setNumbers("");
      setIcon("");
    }
  };

  useEffect(() => {
    getData(value, id);
    getStatus(value);
  }, [isCreate, value]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("numbers", numbers);
    formData.append("icon_up", iconRef.current?.files[0] || icon);
    formData.append("status_id", status);

    const res = await useEdit(
      isCreate,
      value,
      "formData",
      id,
      transId,
      formData,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/updatestatisticalnumbers`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/updatestatisticalnumberstranslation`,
      [
        { statistical_numbers_id: id },
        { language_id },
        { status_translation_id: status },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/createstatisticalnumberstranslation`,
      [{ statistical_numbers_id: id }, { language_id }],
      ["status_id"]
    );

    res.status === 200 && setIsCreate(false);
  };

  return (
    <Wrapper title={"Edit Statistics"}>
      <form onSubmit={handleSubmit}>
        <LanguageSelect onChange={(e) => setValue(e)} />
        <div className="row">
          <Input
            label="Title"
            className={!isCreate ? "col-md-4" : "col-md-6"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            className={!isCreate ? "col-md-4" : "col-md-6"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Numbers"
            className={!isCreate ? "col-md-4" : "col-md-6"}
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
          />
          {!isCreate && (
            <Select
              label="Status"
              className="col-md-4"
              value={status}
              onChange={(e) => setStatus(e)}
              options={statusData}
            />
          )}
          <ChooseFile
            label="Icon"
            className={!isCreate ? "col-md-4" : "col-md-6"}
            ref={iconRef}
          />
          {!isCreate && <Image img={icon} className="col-md-3" />}
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
