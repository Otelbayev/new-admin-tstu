import React, { useEffect, useRef, useState } from "react";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useDepartmentContext } from "../../context/DepartmentContext";
import { useGenderContext } from "../../context/GenderContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { useEmployeeContext } from "../../context/EmployeeContext";
import axios from "axios";
import Cookies from "js-cookie";
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

const Create = () => {
  const [value, setValue] = useState("uz");

  const { i18n } = useTranslation();

  const { options } = useLanguageContext();
  const id = options.find((e) => e.code === value)?.id;
  const navigate = useNavigate();
  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { genderData, getGender } = useGenderContext();
  const { getEmployeeType, employeeTypeData } = useEmployeeContext();

  const bioRef = useRef();
  const [form] = Form.useForm();

  console.log(genderData);

  const onHandleSubmit = async (e) => {
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
              firstName: e.name,
              lastName: e.surname,
              fathers_name: e.patronymic,
              gender_id: e.gender,
              employee_type_translation_id: e.employee,
              departament_translation_id: e.department,
            },
            persons_data_id: res1?.data?.id,
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
    form.setFieldValue("gender", genderData[0]?.value);
  }, [genderData]);

  useEffect(() => {
    form.setFieldValue("department", departmentOptions[0]?.value);
  }, [departmentOptions]);

  useEffect(() => {
    form.setFieldValue("employee", employeeTypeData[0]?.value);
  }, [employeeTypeData]);

  return (
    <Wrapper title={"Xodim Qo'shish"}>
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
    </Wrapper>
  );
};

export default Create;
