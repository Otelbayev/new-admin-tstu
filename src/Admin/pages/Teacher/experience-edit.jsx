import React, { useEffect, useRef, useState } from "react";
import { Input, Select } from "../../components/Generics";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../..//context/LanguageContext";
import { useParams } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEdit } from "../../hooks/useEdit";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const startRef = useRef();
  const endRef = useRef();
  const whomRef = useRef();
  const whereRef = useRef();

  const { options } = useLanguageContext();
  const { id } = useParams();

  const language_id = options.find((option) => option.code === value)?.id;

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      !startRef.current?.value &&
      !whomRef.current?.value &&
      !whereRef.current?.value
    ) {
      message.error("Barcha ma'lumotlarni kiritish kerak!");
      return;
    }

    const res = await useEdit(
      isCreate,
      value,
      "obj",
      id,
      transId,
      {
        since_when: Number(startRef.current?.value),
        until_when: Number(endRef.current?.value),
        whom: whomRef.current?.value,
        where: whereRef.current?.value,
      },
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/updatepersonscientificactivity`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/updatepersonscientificactivitytranslation`,
      [
        {
          person_scientific_activity_id: Number(id),
        },
        { status_translation_id: status },
        { language_id },
      ],
      ["status_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivitytranslation`,
      [
        {
          person_scientific_activity_id: Number(id),
        },
        { language_id },
      ],
      ["status_id"]
    );

    if (res?.data?.statusCode === 200) {
      setIsCreate(false);
    }
  };

  const getData = async (id, value) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/personscientificactivity/getbyidpersonscientificactivityprofil/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/personscientificactivity/getbyidpersonscientificactivitytranslationuzidprofil/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.data.id !== 0) {
      setIsCreate(false);
      setTransId(res?.data?.id);
      startRef.current.value = res?.data?.since_when;
      endRef.current.value = res?.data?.until_when;
      whomRef.current.value = res?.data?.whom;
      whereRef.current.value = res?.data?.where;
    } else {
      setIsCreate(true);
      whomRef.current.value = "";
      whereRef.current.value = "";
    }
  };

  useEffect(() => {
    getData(id, value);
  }, [value, isCreate]);

  return (
    <Wrapper title="Yaratish">
      <form className="form-horizontal row" onSubmit={onHandleSubmit}>
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <Input
          className="form-group col-md-2"
          label={`Boshlagan yili (${value})`}
          type="number"
          ref={startRef}
        />
        <Input
          className="form-group col-md-2"
          label={`Tugatgan yili (${value})`}
          type="number"
          ref={endRef}
        />
        <Input
          className="form-group col-md-3"
          ref={whomRef}
          label={`Lavozim (${value})`}
        />
        <Input
          className="form-group col-md-5"
          ref={whereRef}
          label={`Qayerda (${value})`}
        />
        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            {isCreate ? (
              <button type="submit" className="btn btn-success">
                yaratish
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                yangilash
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
