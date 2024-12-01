import React, { useEffect, useRef, useState } from "react";
import {
  ChooseFile,
  Editor,
  Input,
  Select,
} from "../../../components/Generics";
import LanguageSelect from "../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useDepartmentContext } from "../../../context/DepartmentContext";
import { useGenderContext } from "../../../context/GenderContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import { useEmployeeContext } from "../../../context/EmployeeContext";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");

  const { i18n } = useTranslation();

  const { options } = useLanguageContext();
  const id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();
  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { genderData, getGender } = useGenderContext();
  const { getEmployeeType, employeeTypeData } = useEmployeeContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [jshir, setJshir] = useState("");
  const [passportSerial, setPassportSerial] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [departent, setDepartent] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState("");
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

  const bioRef = useRef();

  const [login, setLogin] = useState("");
  const pwRef = useRef();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("persons_.firstName", name);
    formData.append("persons_.lastName", surname);
    formData.append("persons_.fathers_name", patronymic);
    formData.append("persons_.email", email);
    if (value === "uz") {
      formData.append("persons_.gender_id", gender);
      formData.append("persons_.employee_type_id", employee);
      formData.append("persons_.departament_id", departent);
      formData.append("login", login || "");
      formData.append("password", pwRef.current?.value || "");
    } else {
      formData.append(
        "persons_.gender_id",
        genderData.find((e) => e.value === gender)?.parent
      );
      formData.append(
        "persons_.employee_type_id",
        employeeTypeData.find((e) => e.value === employee)?.parent
      );
      formData.append(
        "persons_.departament_id",
        departmentOptions.find((e) => e.value === departent)?.parent
      );
    }
    formData.append("persons_.pinfl", jshir);
    formData.append("persons_.passport_text", passportSerial);
    formData.append("persons_.passport_number", passportNumber);
    formData.append("biography_json", $(bioRef.current).summernote("code"));
    formData.append("birthday", date);
    formData.append("degree", degree);
    formData.append("scientific_title", scientific_title);
    formData.append("experience_year", experience);
    formData.append("phone_number1", tel1);
    formData.append("phone_number2", tel2);
    formData.append("orchid", orcid);
    formData.append("scopus_id", scopus);
    formData.append("address", address);
    formData.append("languages_uz", uzbek || 0);
    formData.append("languages_en", ingiliz || 0);
    formData.append("languages_ru", rus || 0);
    formData.append("languages_any_title", other);
    formData.append("languages_any", other2 || 0);
    formData.append("img_up", img || null);

    if (value === "uz") {
      try {
        message.loading({ key: "msg", content: "Loading..." });
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL_API}/persondata/createpersondata`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_token")}`,
            },
          }
        );
        if (res?.status === 200) {
          message.success({ key: "msg", content: "Succesfully Created!" });
          navigate(`/${i18n.language}/admin/employee/edit/${res.data?.id}`);
        }
      } catch (err) {
        message.error({ key: "msg", content: "Something went wrong!" });
      }
    } else {
      try {
        message.loading({ key: "msg", content: "Loading..." });
        const res1 = await axios.post(
          `${import.meta.env.VITE_BASE_URL_API}/persondata/createpersondata`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_token")}`,
            },
          }
        );
        const res2 = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/createpersondatatranslation`,
          {
            persons_translation_: {
              firstName: name,
              lastName: surname,
              fathers_name: patronymic,
              gender_id: gender,
              employee_type_translation_id: employee,
              departament_translation_id: departent,
            },
            persons_data_id: res1?.data?.id,
            biography_json: $(bioRef.current).summernote("code"),
            birthday: `${date}T00:31:01.134Z`,
            degree,
            scientific_title,
            experience_year: Number(experience),
            phone_number1: tel1,
            phone_number2: tel2,
            orchid: orcid,
            scopus_id: scopus,
            address: address,
            languages_uz: Number(uzbek) || 0,
            languages_en: Number(ingiliz) || 0,
            languages_ru: Number(rus) || 0,
            languages_any_title: other,
            languages_any: Number(other2) || 0,
            language_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_token")}`,
            },
          }
        );
        if (res2.status === 200) {
          message.success({ key: "msg", content: "Succesfully Created!" });
          navigate(`/${i18n.language}/admin/employee`);
        }
      } catch (err) {
        message.error({ key: "msg", content: "Something went wrong!" });
      }
    }
  };

  useEffect(() => {
    getSelectDepartment(value);
    getGender(value);
    getEmployeeType(value);
  }, [value]);

  useEffect(() => {
    setGender(genderData[0]?.value);
  }, [genderData]);

  useEffect(() => {
    setDepartent(departmentOptions[1]?.value);
  }, [departmentOptions]);

  useEffect(() => {
    setEmployee(employeeTypeData[0]?.value);
  }, [employeeTypeData]);

  return (
    <Wrapper title={"Create Person"}>
      <form onSubmit={onHandleSubmit} className="form-horizontal row">
        <div className="col-md-12">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <Input
          className="form-group col-md-4"
          label={`Ism (${value})`}
          placeholder="Ism"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <Input
          className="form-group col-md-4"
          label={`Familiya (${value})`}
          placeholder="Familiya"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          name="surname"
        />
        <Input
          className="form-group col-md-4"
          label={`Otasining ismi (${value})`}
          placeholder="Otasining ismi"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
          name="patronymic"
        />
        <Input
          className="form-group col-md-3"
          label={`Email (${value})`}
          placeholder="qwerty@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        {value === "uz" && (
          <Input
            className="form-group col-md-3"
            label={`JSHSHIR - ПИНФЛ (${value})`}
            placeholder="123456789"
            maxLength={14}
            minLength={14}
            value={jshir}
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
            value={passportSerial}
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
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
          />
        )}
        <Select
          label="Jinsi"
          className={"form-group col-md-3"}
          options={genderData}
          value={gender}
          onChange={(e) => setGender(e)}
        />
        <Select
          label="Bo'lim"
          className={"form-group col-md-3"}
          options={departmentOptions}
          showSearch={true}
          value={departent}
          onChange={(e) => setDepartent(e)}
        />
        <Select
          label="Xodim turi"
          className={"form-group col-md-3"}
          options={employeeTypeData}
          showSearch={true}
          value={employee}
          onChange={(e) => setEmployee(e)}
        />
        <Input
          label="Tug'ilgan sanasi"
          className="form-group col-md-3"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {value === "uz" && (
          <ChooseFile
            className="form-group col-md-3"
            label="Rasm"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Input
          label={`Ilmiy daraja (${value})`}
          placeholder="type"
          className="form-group col-md-3"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <Input
          label={`Ilmiy Unvoni (${value})`}
          placeholder="type"
          className="form-group col-md-3"
          value={scientific_title}
          onChange={(e) => setScientific_title(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="Tajribasi (yil)"
          placeholder="0"
          minLength={1}
          maxLength={2}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="Telefon 1"
          name="tel"
          type="tel"
          placeholder="+99899 999-99-99"
          value={tel1}
          onChange={(e) => setTel1(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="Telefon 2"
          name="tel"
          type="tel"
          placeholder="+99899 999-99-99"
          value={tel2}
          onChange={(e) => setTel2(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="ORCID"
          placeholder="0009-0009-0009-0009"
          value={orcid}
          onChange={(e) => setOrcid(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="Scopus ID"
          placeholder={58816969400}
          value={scopus}
          onChange={(e) => setScopus(e.target.value)}
        />
        <Input
          className={"form-group col-md-3"}
          label="Address"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="O'zbek tili (1-99)%"
          className="form-group col-md-2"
          placeholder="80%"
          minLength={2}
          maxLength={2}
          value={uzbek}
          onChange={(e) => setUzbek(e.target.value)}
        />
        <Input
          label="Ingiliz tili (1-99)%"
          className="form-group col-md-2"
          placeholder="80%"
          minLength={2}
          maxLength={2}
          value={ingiliz}
          onChange={(e) => setIngiliz(e.target.value)}
        />
        <Input
          label="Rus tili (1-99)%"
          className="form-group col-md-2"
          placeholder="80%"
          minLength={2}
          maxLength={2}
          value={rus}
          onChange={(e) => setRus(e.target.value)}
        />
        <Input
          label="Boshqa til nomi"
          className="form-group col-md-3"
          placeholder="Koreys tili"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
        <Input
          label="Boshqa til (1-99)%"
          className="form-group col-md-4"
          placeholder="80%"
          minLength={2}
          maxLength={2}
          value={other2}
          onChange={(e) => setOther2(e.target.value)}
        />
        <Input
          label="Login"
          className="form-group col-md-4"
          value={login}
          onChange={(e) => setLogin(e?.target?.value)}
        />
        <Input label="Parol" className="form-group col-md-4" ref={pwRef} />
        <Editor
          lan={value}
          label="Biografiya"
          className="form-group col-md-12"
          ref={bioRef}
        />
        <div className="form-group col-md-12">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-success w-100">
              Create
            </button>
          </div>
        </div>
      </form>
      {/* <hr /> */}
      {/* <Experience
        title="Tadjribasi"
        value={value}
        id={id}
        language_id={id}
        url={`${
          import.meta.env.VITE_BASE_URL_API
        }/personexperience/createpersonexperienceadmin`}
        translationUrl={`${
          import.meta.env.VITE_BASE_URL_API
        }/personexperience/createpersonexperiencetranslationadmin`}
      /> */}
    </Wrapper>
  );
};

export default Create;
