import React, { useEffect, useRef, useState } from "react";
import {
  ChooseFile,
  Editor,
  Input,
  Select,
  Image,
} from "../../components/Generics";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useGenderContext } from "../../context/GenderContext";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

const Info = () => {
  const [value, setValue] = useState("uz");

  const [isCreate, setIsCreate] = useState(false);

  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;

  const { genderData, getGender } = useGenderContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [jshir, setJshir] = useState("");
  const [passportSerial, setPassportSerial] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [date, setDate] = useState(null);
  const [degree, setDegree] = useState("");
  const [scientific_title, setScientific_title] = useState("");
  const [experience, setExperience] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [orcid, setOrcid] = useState("");
  const [scopus, setScopus] = useState("");
  const [address, setAddress] = useState("");
  const [uzbek, setUzbek] = useState("");
  const [ingiliz, setIngiliz] = useState("");
  const [rus, setRus] = useState("");
  const [other, setOther] = useState("");
  const [other2, setOther2] = useState("");
  const [img, setImg] = useState(null);
  const [src, setSrc] = useState(null);

  const bioRef = useRef();

  const getDataId = async (value) => {
    try {
      const res = await axios.get(
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/getbyidpersondataprofile`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/getbyidpersondatatranslationprofile/${value}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        if (value === "uz") {
          setGender(res?.data?.persons_?.gender_?.id);
          setEmail(res?.data?.persons_?.email);
          setJshir(res?.data?.persons_?.pinfl);
          setPassportSerial(res?.data?.persons_?.passport_text);
          setPassportNumber(res?.data?.persons_?.passport_number);
          setDate(res?.data?.birthday?.split("T")[0]);
          setExperience(res?.data?.experience_year);
          setTel1(res?.data?.phone_number1);
          setTel2(res?.data?.phone_number2);
          setOrcid(res?.data?.orchid);
          setScopus(res?.data?.scopus_id);
          setUzbek(res?.data?.languages_uz);
          setIngiliz(res?.data?.languages_en);
          setRus(res?.data?.languages_ru);
        }

        setName(
          res?.data?.persons_?.firstName ||
            res?.data?.persons_translation_?.firstName
        );
        setSurname(
          res?.data?.persons_?.lastName ||
            res?.data?.persons_translation_?.lastName
        );
        setPatronymic(
          res?.data?.persons_?.fathers_name ||
            res?.data?.persons_translation_?.fathers_name
        );
        setSrc(res?.data?.persons_?.img_?.url);
        setImg(res?.data?.img_?.url || res?.data?.img_translation_?.url);
        $(bioRef.current)?.summernote("code", res?.data?.biography_json);
        setAddress(res?.data?.address);
        setDegree(res?.data?.degree);
        setScientific_title(res?.data?.scientific_title);
        setOther(res?.data?.languages_any_title);
        setOther2(res?.data?.languages_any);

        if (res?.data?.persons_translation_ === null) {
          setIsCreate(true);
        } else {
          setIsCreate(false);
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsCreate(true);
      setName("");
      setSurname("");
      setPatronymic("");
      setAddress("");
      setDegree("");
      setScientific_title("");
      setOther("");
      $(bioRef.current)?.summernote("code", "");
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      persons_translation_: {
        firstName: name,
        lastName: surname,
        fathers_name: patronymic,
        gender_id: genderData.find((e) => e.parent === gender)?.value,
      },
      biography_json: $(bioRef.current)?.summernote("code"),
      birthday: date ? `${date}T16:38:51.281Z` : null,
      degree: degree,
      experience_year: Number(experience),
      phone_number1: tel1 || "",
      phone_number2: tel2 || "",
      orchid: orcid || "",
      scopus_id: scopus || "",
      address: address || "",
      languages_uz: Number(uzbek) || 0,
      languages_en: Number(ingiliz) || 0,
      languages_ru: Number(rus) || 0,
      languages_any_title: other,
      languages_any: Number(other2) || 0,
      scientific_title: scientific_title || "",
      language_id,
    };

    const formData = new FormData();

    formData.append("persons_.firstName", name);
    formData.append("persons_.lastName", surname);
    formData.append("persons_.fathers_name", patronymic || "");
    formData.append("persons_.email", email || "");
    formData.append("persons_.gender_id", gender || 1);
    formData.append("persons_.pinfl", jshir || "");
    formData.append("persons_.passport_text", passportSerial || "");
    formData.append("persons_.passport_number", passportNumber || "");
    formData.append(
      "biography_json",
      $(bioRef.current)?.summernote("code") || ""
    );
    formData.append("birthday", date ? `${date}T16:38:51.281Z` : "");
    formData.append("degree", degree || "");
    formData.append("experience_year", experience || "");
    formData.append("phone_number1", tel1 || "");
    formData.append("phone_number2", tel2 || "");
    formData.append("orchid", orcid || "");
    formData.append("scopus_id", scopus || "");
    formData.append("address", address || "");
    formData.append("languages_uz", uzbek || 0);
    formData.append("languages_en", ingiliz || 0);
    formData.append("languages_ru", rus || 0);
    formData.append("languages_any_title", other || "");
    formData.append("languages_any", other2 || 0);
    formData.append("img_up", img);
    formData.append("scientific_title", scientific_title);

    try {
      message.loading({ key: "key", content: "Loading!" });
      if (isCreate) {
        const res = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/createpersondatatranslationprofile`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_token")}`,
            },
          }
        );

        if (res.status === 200) {
          getDataId(value);
          message.success({
            key: "key",
            content: "Muvaffaqiyatli yaratildi!",
          });
        }

        return;
      }
      const res = await axios.put(
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/updatepersondataprofile`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/updatepersondatatranslationprofile/${value}`,
        value === "uz" ? formData : obj,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      res.status === 200 &&
        message.success({
          key: "key",
          content: "Muvaffaqiyatli o'zgartirildi!",
        });
    } catch (err) {
      message.error({ key: "key", content: "Xatolik yuz berdi!" });
    }
  };

  useEffect(() => {
    getGender(value);
    getDataId(value);
  }, [value]);

  return (
    <Wrapper title="Ma'lumotlatlarim">
      <form onSubmit={onHandleSubmit} className="form-horizontal row">
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <Input
          className="form-group col-md-4"
          label={`Ism (${value})`}
          placeholder="Ism"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <Input
          className="form-group col-md-4"
          label={`Familiya (${value})`}
          placeholder="Familiya"
          value={surname || ""}
          onChange={(e) => setSurname(e.target.value)}
          name="surname"
        />
        <Input
          className="form-group col-md-4"
          label={`Otasining ismi (${value})`}
          placeholder="Otasining ismi"
          value={patronymic || ""}
          onChange={(e) => setPatronymic(e.target.value)}
          name="patronymic"
        />
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label={`Email (${value})`}
            placeholder="qwerty@gmail.com"
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        )}
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label={`JSHSHIR - ПИНФЛ (${value})`}
            placeholder="123456789"
            maxLength={14}
            minLength={14}
            value={jshir || ""}
            onChange={(e) => setJshir(e.target.value)}
            name="pinfl"
          />
        )}
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label={`Passport - № (${value})`}
            placeholder="AB"
            maxLength={2}
            minLength={2}
            value={passportSerial || ""}
            onChange={(e) => setPassportSerial(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label={`Passport - № (${value})`}
            placeholder="1234567"
            minLength={7}
            maxLength={7}
            value={passportNumber || ""}
            onChange={(e) => setPassportNumber(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Select
            label="Jinsi"
            className={"form-group col-md-3"}
            options={genderData}
            value={gender}
            onChange={(e) => setGender(e)}
          />
        )}
        {value === "uz" && (
          <Input
            label="Tug'ilgan sanasi"
            className="form-group col-md-3"
            type="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
        <Input
          label={`Ilmiy daraja (${value})`}
          placeholder="type"
          className={
            value == "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          value={degree || ""}
          onChange={(e) => setDegree(e.target.value)}
        />
        <Input
          label={`Ilmiy unvon (${value})`}
          placeholder="type"
          className={
            value == "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          value={scientific_title || ""}
          onChange={(e) => setScientific_title(e.target.value)}
        />
        {value === "uz" && (
          <Input
            className={"form-group col-md-3"}
            label="Tajribasi (yil)"
            placeholder="0"
            minLength={1}
            maxLength={2}
            value={experience || ""}
            onChange={(e) => setExperience(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            className={"form-group col-md-3"}
            label="Telefon 1"
            name="tel"
            type="tel"
            placeholder="+99899 999-99-99"
            value={tel1 || ""}
            onChange={(e) => setTel1(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            className={"form-group col-md-3"}
            label="Telefon 2"
            name="tel"
            type="tel"
            placeholder="+99899 999-99-99"
            value={tel2 || ""}
            onChange={(e) => setTel2(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            className={"form-group col-md-3"}
            label="ORCID"
            placeholder="0009-0009-0009-0009"
            value={orcid || ""}
            onChange={(e) => setOrcid(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            className={"form-group col-md-3"}
            label="Scopus ID"
            placeholder={58816969400}
            value={scopus || ""}
            onChange={(e) => setScopus(e.target.value)}
          />
        )}
        <Input
          className={
            value == "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          label="Address"
          placeholder="address"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />
        {value === "uz" && (
          <Input
            label="O'zbek tili (1-99)%"
            className={
              value === "uz" ? "form-group col-md-3" : "form-group col-md-2"
            }
            placeholder="80%"
            minLength={2}
            maxLength={2}
            value={uzbek || ""}
            onChange={(e) => setUzbek(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            label="Ingiliz tili (1-99)%"
            className={
              value === "uz" ? "form-group col-md-3" : "form-group col-md-2"
            }
            placeholder="80%"
            minLength={2}
            maxLength={2}
            value={ingiliz || ""}
            onChange={(e) => setIngiliz(e.target.value)}
          />
        )}
        {value === "uz" && (
          <Input
            label="Rus tili (1-99)%"
            className={
              value === "uz" ? "form-group col-md-3" : "form-group col-md-2"
            }
            placeholder="80%"
            minLength={2}
            maxLength={2}
            value={rus || ""}
            onChange={(e) => setRus(e.target.value)}
          />
        )}

        <Input
          label="Boshqa til nomi"
          className={
            value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
          }
          placeholder="Koreys tili"
          value={other || ""}
          onChange={(e) => setOther(e.target.value)}
        />

        {value === "uz" && (
          <Input
            label="Boshqa til (1-99)%"
            className={
              value === "uz" ? "form-group col-md-3" : "form-group col-md-2"
            }
            placeholder="80%"
            minLength={2}
            maxLength={2}
            value={other2 || ""}
            onChange={(e) => setOther2(e.target.value)}
          />
        )}
        <Editor
          lan={value}
          ref={bioRef}
          label="Biografiya"
          className="form-group col-md-4"
        />
        {value === "uz" && (
          <ChooseFile
            className="form-group col-md-4"
            label="Rasm"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        {value === "uz" && (
          <Image
            className="form-group col-md-4"
            img={`${import.meta.env.VITE_BASE_URL_IMG}${src}`}
            label="Rasm"
          />
        )}
        <div className="form-group col-md-12">
          <div className="col-sm-2">
            {isCreate ? (
              <button type="submit" className="btn btn-success w-100">
                Yaratish
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Yangilash
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Info;
