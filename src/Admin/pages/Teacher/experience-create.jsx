import React, { useRef, useState } from "react";
import { Input } from "../../components/Generics";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../..//context/LanguageContext";
import { useCreate } from "../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { message } from "antd";

const Create = () => {
  const [value, setValue] = useState("uz");
  const navigate = useNavigate();

  const startRef = useRef();
  const endRef = useRef();
  const whomRef = useRef();
  const whereRef = useRef();

  const { options } = useLanguageContext();

  const id = options.find((option) => option.code === value)?.id;

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
    const res = await useCreate(
      value,
      "obj",
      {
        since_when: Number(startRef.current?.value),
        until_when: Number(endRef.current?.value),
        whom: whomRef.current?.value,
        where: whereRef.current?.value,
      },
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivity`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/createpersonscientificactivitytranslation`,
      "person_scientific_activity_id",
      [
        {
          language_id: id,
        },
      ]
    );
    if (res.statusCode === 200) {
      value === "uz"
        ? navigate(`/admin/experience/edit/${res.id}`)
        : navigate("/admin/experience");
    }
  };

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
            <button type="submit" className="btn btn-success">
              Yaratish
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
