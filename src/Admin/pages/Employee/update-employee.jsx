import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useDepartmentContext } from "../../context/DepartmentContext";
import { useGenderContext } from "../../context/GenderContext";
import { useParams } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { useEmployeeContext } from "../../context/EmployeeContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../context/Status/index";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import { useTranslation } from "react-i18next";
import { FiUploadCloud } from "react-icons/fi";
import { Editor } from "../../components/Generics";

const Edit = () => {
  const [value, setValue] = useState("uz");
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();
  const [form] = Form.useForm();

  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { genderData, getGender } = useGenderContext();
  const { getEmployeeType, employeeTypeData } = useEmployeeContext();
  const { statusData, getStatus } = useStatusContext();

  const [img, setImg] = useState(null);
  const [src, setSrc] = useState(null);

  const bioRef = useRef();

  const getDataId = async (value, id) => {
    try {
      const res = await axios.get(
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/getbyidpersondata/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/persondata/getbyuzidpersondatatranslation/${id}?language_code=${value}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        form.setFieldsValue({
          name: res?.data?.persons_?.firstName,
          surname: res?.data?.persons_?.lastName,
          patronymic: res?.data?.persons_?.fathers_name,
          gender: res?.data?.persons_?.gender_?.id,
          department: res?.data?.persons_?.departament_?.id,
          employee: res?.data?.persons_?.employee_type_?.id,
          email: res?.data?.persons_?.email,
          jshir: res?.data?.persons_?.pinfl,
          pw_serial: res?.data?.persons_?.passport_text,
          pw_number: res?.data?.persons_?.passport_number,
          date: res?.data?.birthday,
          ex: res?.data?.experience_year,
          phone1: res?.data?.phone_number1,
          phone1: res?.data?.phone_number2,
          oricd: res?.data?.orchid,
          scopus_id: res?.data?.scopus_id,
          uzb: res?.data?.languages_uz,
          eng: res?.data?.languages_en,
          rus: res?.data?.languages_ru,
          status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
          login: res.data?.login,
          address: res?.data?.address,
          daraja: res?.data?.degree,
          unvon: res?.data?.scientific_title,
          other_title: res?.data?.languages_any_title,
          other: res?.data?.languages_any,
        });

        setIsCreate(false);
        setTransId(res?.data?.id);
        setSrc(res?.data?.persons_?.img_?.url);
        setImg(res?.data?.img_?.url || res?.data?.img_translation_?.url);
        $(bioRef.current)?.summernote("code", res?.data?.biography_json);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsCreate(true);
      form.resetFields();
      $(bioRef.current)?.summernote("code", "");
    }
  };

  const onHandleSubmit = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading!" });
      const obj = {
        persons_translation_: {
          firstName: e.name,
          lastName: e.surname,
          fathers_name: e.patronymic,
          gender_id: e.gender,
          employee_type_translation_id: e.employee,
          departament_translation_id: e.department,
        },
        persons_data_id: transId,
        biography_json: $(bioRef.current).summernote("code"),
        birthday: e.date,
        degree: e.daraja,
        scientific_title: e.unvon,
        experience_year: Number(e.ex),
        phone_number1: e.phone1,
        phone_number2: e.phone2,
        orchid: e.orcid,
        scopus_id: e.scopus,
        address: e.address,
        languages_uz: Number(e.uzb) || 0,
        languages_en: Number(e.eng) || 0,
        languages_ru: Number(e.rus) || 0,
        languages_any_title: e.other_title || "",
        languages_any: Number(e.other) || 0,
        language_id: id,
        status_translation_id: e.status,
      };
      if (value === "uz" && !isCreate) {
        const formData = new FormData();
        formData.append("persons_.firstName", e.name || "");
        formData.append("persons_.lastName", e.surname || "");
        formData.append("persons_.fathers_name", e.patronymic || "");
        formData.append("persons_.email", e.email || "");
        formData.append("persons_.gender_id", e.gender || "");
        formData.append("persons_.employee_type_id", e.employee || "");
        formData.append("persons_.departament_id", e.department || "");
        formData.append("login", e.login || "");
        formData.append("password", e.pw || "");
        formData.append("persons_.pinfl", e.jshir || "");
        formData.append("persons_.passport_text", e.pw_serial || "");
        formData.append("persons_.passport_number", e.pw_number || "");
        formData.append(
          "biography_json",
          $(bioRef.current).summernote("code") || ""
        );
        formData.append("birthday", e.date || "");
        formData.append("degree", e.daraja || "");
        formData.append("scientific_title", e.unvon || "");
        formData.append("experience_year", e.ex || "");
        formData.append("phone_number1", e.phone1 || "");
        formData.append("phone_number2", e.phone2 || "");
        formData.append("orchid", e.orcid || "");
        formData.append("scopus_id", e.scopus || "");
        formData.append("address", e.address || "");
        formData.append("languages_uz", e.uzb || 0);
        formData.append("languages_en", e.eng || 0);
        formData.append("languages_ru", e.rus || 0);
        formData.append("languages_any_title", e.other_title || "");
        formData.append("languages_any", e.other || 0);
        formData.append("img_up", e.image?.fileList[0]?.originFileObj || "");

        const res = await axios.put(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/updatepersondata/${id}`,
          formData,
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
      } else if (value !== "uz" && !isCreate) {
        obj.persons_data_id = Number(id);
        const res = await axios.put(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/updatepersondatatranslation/${transId}`,
          obj,
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
      } else if (isCreate) {
        delete obj.status_translation_id;
        obj.persons_data_id = Number(id);
        const res = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/createpersondatatranslation`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_token")}`,
            },
          }
        );
        if (res.status === 200) {
          setIsCreate(false);
          message.success({
            key: "key",
            content: "Muvaffaqiyatli o'zgartirildi!",
          });
        }
      }
    } catch (err) {
      message.error({ key: "key", content: "Somthing went wrong!" });
    }
  };

  useEffect(() => {
    getSelectDepartment(value);
    getGender(value);
    getEmployeeType(value);
    getStatus(value);
    getDataId(value, id);
  }, [value, isCreate]);

  return (
    <Wrapper title={"Edit Person"}>
      <Form layout="vertical" onFinish={onHandleSubmit} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setValue(e)} />
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label={`Familiya (${value})`}
              name="surname"
              rules={[{ required: true, message: "Surname is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label={`Ismi (${value})`}
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label={`Otasinging ismi (${value})`}
              name="patronymic"
              rules={[{ required: true, message: "Patronymic is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="email" label={`Email (${value})`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="jshir" label={`JSHIR-ПИНФЛ (${value})`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="pw_serial" label={`Passport serial (${value})`}>
              <Input placeholder="AB" maxLength={2} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="pw_number" label={`Passport raqami (${value})`}>
              <Input placeholder="1234567" maxLength={7} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="gender" label={`Jinsi`}>
              <Select options={genderData} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="department" label={`Bo'lim`}>
              <Select options={departmentOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="employee" label={`Xodim turi`}>
              <Select options={employeeTypeData} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="date" label={`Tug'ilgan sana`}>
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="address" label={`Manzil`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="daraja" label={`Ilmiy daraja`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="unvon" label={`Ilmiy Unvon`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="ex" label={`Tajribasi `}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="phone1" label={`Telefon 1  `}>
              <Input type="tel" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="phone2" label={`Telefon 2  `}>
              <Input type="tel" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="orcid" label={`ORCID`}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="scopus" label={`SCOPUS ID`}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="uzb" label={"O'zbek tili (%)"}>
              <InputNumber min={0} style={{ width: "100%" }} max={100} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="rus" label={"Rus tili (%)"}>
              <InputNumber min={0} style={{ width: "100%" }} max={100} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="eng" label={"Ingiliz tili (%)"}>
              <InputNumber min={0} style={{ width: "100%" }} max={100} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="other_title" label={"Boshqa til nomi"}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="other" label={"Boshqa tili (%)"}>
              <InputNumber min={0} style={{ width: "100%" }} max={100} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="login" label={"Login"}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="pw" label={"Parol"}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="image" label={`Rasm`}>
              <Upload maxCount={1}>
                <Button style={{ width: "100%" }} icon={<FiUploadCloud />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Editor ref={bioRef} />
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Col>
        </Row>
      </Form>
      {/* <form onSubmit={onHandleSubmit} className="form-horizontal row">
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
          <Select
            label="Bo'lim"
            className={"form-group col-md-3"}
            options={departmentOptions}
            showSearch={true}
            value={departent}
            onChange={(e) => setDepartent(e)}
          />
        )}
        {value === "uz" && (
          <Select
            label="Xodim turi"
            className={"form-group col-md-3"}
            options={employeeTypeData}
            showSearch={true}
            value={employee}
            onChange={(e) => setEmployee(e)}
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
        {!isCreate && (
          <Select
            label={"Status"}
            className={
              value === "uz" ? "form-group col-md-3" : "form-group col-md-4"
            }
            value={status}
            onChange={(e) => setStatus(e)}
            options={statusData}
          />
        )}
        {value === "uz" && (
          <ChooseFile
            className="form-group col-md-4"
            label="Rasm"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        {value === "uz" && !isCreate && (
          <Image
            className="form-group col-md-2"
            img={`${import.meta.env.VITE_BASE_URL_IMG}${src}`}
            label="Rasm"
          />
        )}
        {value === "uz" && (
          <Input
            label="Login"
            className={"form-group col-md-4"}
            value={login}
            onChange={(e) => setLogin(e?.target?.value)}
          />
        )}
        {value === "uz" && (
          <Input label="Parol" className={"form-group col-md-4"} ref={pwRef} />
        )}
        <Editor
          lan={value}
          ref={bioRef}
          label="Biografiya"
          className="form-group col-md-4"
        />
        <div className="form-group col-md-12">
          <div className="col-sm-2">
            {isCreate ? (
              <button type="submit" className="btn btn-success w-100">
                Create
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            )}
          </div>
        </div>
      </form> */}
    </Wrapper>
  );
};

export default Edit;
