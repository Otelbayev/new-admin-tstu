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
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import { FiUploadCloud } from "react-icons/fi";
import { Editor } from "../../components/Generics";
import dayjs from "dayjs";
import { useEdit } from "../../hooks/useEdit";

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

  const bioRef = useRef();

  const getDataId = async (value, id) => {
    try {
      const res = await axios.get(
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/persondata/${
              id ? `getbyidpersondata/${id}` : "getbyidpersondataprofile"
            }`
          : `${import.meta.env.VITE_BASE_URL_API}/persondata/${
              id
                ? `getbyuzidpersondatatranslation/${id}?language_code=${value}`
                : `getbyidpersondatatranslationprofile/${value}`
            }`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        form.setFieldsValue({
          name:
            res?.data?.persons_?.firstName ||
            res?.data?.persons_translation_?.firstName,
          surname:
            res?.data?.persons_?.lastName ||
            res?.data?.persons_translation_?.lastName,
          patronymic:
            res?.data?.persons_?.fathers_name ||
            res?.data?.persons_translation_?.fathers_name,
          gender:
            res?.data?.persons_?.gender_?.id ||
            res?.data?.persons_translation_?.gender_?.id,
          department:
            res?.data?.persons_?.departament_?.id ||
            res.data.persons_translation_?.departament_translation_?.id,
          employee:
            res?.data?.persons_?.employee_type_?.id ||
            res.data.persons_translation_?.employee_type_translation_?.id,
          email:
            res?.data?.persons_?.email ||
            res.data.persons_translation_?.persons_?.email,
          jshir: res?.data?.persons_?.pinfl,
          pw_serial: res?.data?.persons_?.passport_text,
          pw_number: res?.data?.persons_?.passport_number,
          date: res?.data?.birthday ? dayjs(res?.data?.birthday) : null,
          ex: res?.data?.experience_year,
          phone1: res?.data?.phone_number1,
          phone2: res?.data?.phone_number2,
          orchid: res?.data?.orchid,
          scopus: res?.data?.scopus_id,
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
        setImg(res.data.persons_?.img_?.url);
        $(bioRef.current)?.summernote("code", res?.data?.biography_json);
      } else {
        setIsCreate(true);
        form.resetFields();
        $(bioRef.current)?.summernote("code", "");
      }
    } catch (error) {
      setIsCreate(true);
      form.resetFields();
      $(bioRef.current)?.summernote("code", "");
    }
  };

  const onHandleSubmit = async (e) => {
    try {
      const formData = new FormData();

      formData.append("persons_.firstName", e.name || "");
      formData.append("persons_.lastName", e.surname || "");
      formData.append("persons_.fathers_name", e.patronymic || "");
      formData.append("persons_.email", e.email || "");
      formData.append("persons_.gender_id", e.gender || "");
      formData.append("persons_.pinfl", e.jshir || "");
      formData.append("persons_.passport_text", e.pw_serial || "");
      formData.append("persons_.passport_number", e.pw_number || "");
      formData.append("persons_.departament_id", e.department || "");
      formData.append("persons_.employee_type_id", e.employee || "");
      formData.append("login", e.login || "");
      formData.append("password", e.pw || "");
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
      formData.append("orchid", e.orchid || "");
      formData.append("scopus_id", e.scopus || "");
      formData.append("address", e.address || "");
      formData.append("languages_uz", e.uzb || 0);
      formData.append("languages_en", e.eng || 0);
      formData.append("languages_ru", e.rus || 0);
      formData.append("languages_any_title", e.other_title || "");
      formData.append("languages_any", e.other || 0);
      formData.append("img_up", e.image?.fileList[0]?.originFileObj || "");
      formData.append("status_id", e.status);

      if (value === "uz") {
        const res = await useEdit(
          isCreate,
          value,
          "formData",
          id,
          transId,
          formData,
          `${import.meta.env.VITE_BASE_URL_API}/persondata/updatepersondata`
        );
        handleSuccess(res.status);
      } else {
        const obj = {
          persons_translation_: {
            firstName: e.name,
            lastName: e.surname,
            fathers_name: e.patronymic,
            gender_id: e.gender,
            employee_type_translation_id: e.employee,
            departament_translation_id: e.department,
          },
          persons_data_id: Number(id),
          biography_json: $(bioRef.current).summernote("code") || "",
          birthday: e.date || "",
          degree: e.degree || "",
          scientific_title: e.unvon || "",
          experience_year: e.ex || "",
          phone_number1: e.phone1 || "",
          phone_number2: e.phone2 || "",
          orchid: e.orchid || "",
          scopus_id: e.scopus || "",
          address: e.address || "",
          languages_uz: e.uzb || 0,
          languages_en: e.eng || 0,
          languages_ru: e.rus || 0,
          languages_any_title: e.other_title || "",
          languages_any: e.other || 0,
          language_id: language_id,
        };
        if (isCreate) {
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
          handleSuccess(res.status);
        } else {
          obj.status_translation_id = e.status;
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
          handleSuccess(res.status);
        }
      }
    } catch (err) {}
  };

  function handleSuccess(status) {
    if (status === 200) {
      getDataId(value, id);
      value !== "uz" && message.success("Muvaffaqiyatli o'zgartirildi!");
    } else {
      message.error("Xatolik!");
    }
  }

  useEffect(() => {
    getSelectDepartment(value);
    getGender(value);
    getEmployeeType(value);
    getStatus(value);
    getDataId(value, id);
  }, [value, isCreate]);

  useEffect(() => {
    if (isCreate) {
      form.setFieldValue("gender", genderData[0].value);
    }
  }, [genderData]);

  useEffect(() => {
    if (isCreate) {
      form.setFieldValue("department", departmentOptions[0].value);
    }
  }, [departmentOptions]);

  useEffect(() => {
    if (isCreate) {
      form.setFieldValue("employee", employeeTypeData[0].value);
    }
  }, [employeeTypeData]);

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
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="email" label={`Email (${value})`}>
                <Input />
              </Form.Item>
            </Col>
          )}
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="jshir" label={`JSHIR-ПИНФЛ (${value})`}>
                <Input />
              </Form.Item>
            </Col>
          )}
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="pw_serial" label={`Passport serial (${value})`}>
                <Input placeholder="AB" maxLength={2} />
              </Form.Item>
            </Col>
          )}
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="pw_number" label={`Passport raqami (${value})`}>
                <Input placeholder="1234567" maxLength={7} />
              </Form.Item>
            </Col>
          )}
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
            <Form.Item name="orchid" label={`ORCID`}>
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
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="login" label={"Login"}>
                <Input />
              </Form.Item>
            </Col>
          )}
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="pw" label={"Parol"}>
                <Input.Password />
              </Form.Item>
            </Col>
          )}
          {value === "uz" && (
            <Col xs={24} md={6}>
              <Form.Item name="image" label={`Rasm`}>
                <Upload maxCount={1} beforeUpload={() => false}>
                  <Button style={{ width: "100%" }} icon={<FiUploadCloud />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={10}>
            <Form.Item label="Text">
              <Editor ref={bioRef} />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8}>
              <Form.Item name="status" label={`Holati`}>
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}

          {value === "uz" && !isCreate && (
            <Col xs={24} md={4}>
              <Image src={import.meta.env.VITE_BASE_URL_IMG + img} />
            </Col>
          )}

          <Col span={24}>
            <Button type="primary" htmlType="submit">
              {isCreate ? "yaratish" : "yangliash"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default Edit;
