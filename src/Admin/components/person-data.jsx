import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Upload,
  Row,
  Col,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LanguageSelect from "./Generics/LanguageSelect";
import { useGenderContext } from "../context/GenderContext";
import { useLanguageContext } from "../../context/LanguageContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const { Option } = Select;

const PersonComponent = ({ title }) => {
  const [value, setValue] = useState("uz");
  const { genderData, getGender } = useGenderContext();
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const { id } = useParams();

  const [data, setData] = useState({});

  const onFinish = async (values) => {
   
  };

  const getDataId = async (id, value) => {
    const res = await axios.get(
      value === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/rectoratupdated/getbyidrectoratdata/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/rectoratupdated/getbyidrectoratdatatranslation/${id}?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    getGender(value);
    getDataId(id, value);
  }, [value]);

  //   {
  //     "id": 1,
  //     "persons_": {
  //         "id": 1,
  //         "firstName": "Odil ",
  //         "lastName": "Abduraxmanov ",
  //         "fathers_name": "Kalandarovich",
  //         "email": "rektorat@tstu.uz",
  //         "pinfl": null,
  //         "passport_text": null,
  //         "passport_number": null,
  //         "img_": {
  //             "id": 5782,
  //             "title": "484b6660-124f-4efb-aed6-b079496b7e6e",
  //             "url": "/file-uploads/attached/images/e564516a-a141-4f69-8153-dce2d88dc43f.jpg"
  //         },
  //         "gender_": {
  //             "id": 1,
  //             "gender": "Erkak"
  //         },
  //         "employee_type_": {
  //             "id": 4,
  //             "title": "Rektor"
  //         }
  //     },
  //     "biography_json": null,
  //     "birthday": null,
  //     "degree": "Iqtisodiyot fanlari doktori, Professor",
  //     "scientific_title": "null",
  //     "experience_year": null,
  //     "phone_number1": "+998712990001",
  //     "phone_number2": null,
  //     "orchid": null,
  //     "scopus_id": null,
  //     "address": null,
  //     "languages_uz": 99,
  //     "languages_en": 50,
  //     "languages_ru": 90,
  //     "languages_any_title": "Koreys tili",
  //     "languages_any": 40
  // }

  return (
    <Card title={"title"}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          "persons_.firstName": data?.persons_?.firstName,
          // "persons_.lastName": data?.persons_?.lastName,
          // "persons_.fathers_name": data?.persons_?.fathers_name,
          // "persons_.email": data?.persons_?.email,
          // "persons_.pinfl": data?.persons_?.pinfl,
          // "persons_.passport_text": data?.persons_?.passport_text,
          // "persons_.passport_number": data?.persons_?.passport_number,
          // "persons_.gender_id": data?.persons_?.gender_.id,
          // "persons_.employee_type_id": data?.persons_?.employee_type_.id,
          // languages_uz: data?.languages_uz,
          // languages_en: data?.languages_en,
          // languages_ru: data?.languages_ru,
          // languages_any: data?.languages_any,
          // languages_any_title: data?.languages_any_title,
          // phone_number1: data?.phone_number1,
          // phone_number2: data?.phone_number2,
          // experience_year: data?.experience_year,
          // degree: data?.degree,
          // scientific_title: data?.scientific_title,
          // biography_json: data?.biography_json,
          // birthday: data?.birthday,
          // address: data?.address,
          // scopus_id: data?.scopus_id,
          // orchid: data?.orchid,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Til" name="language">
              <LanguageSelect onChange={(e) => setValue(e)} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item label={`Ism (${value})`} name="persons_.firstName">
              <Input placeholder={`Ism (${value})`} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item label={`Familiya (${value})`} name="persons_.lastName">
              <Input placeholder={`Familiya (${value})`} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={`Otasining ismi (${value})`}
              name="persons_.fathers_name"
            >
              <Input placeholder={`Otasining ismi (${value})`} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label={`Email (${value})`} name="persons_.email">
              <Input placeholder={`Email (${value})`} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label={`JSHSHIR - ПИНФЛ (${value})`}
              name="persons_.pinfl"
            >
              <Input placeholder="123456789" maxLength={14} minLength={14} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label={`Passport - № (${value})`}
              name="persons_.passport_text"
            >
              <Input placeholder="AB" maxLength={2} minLength={2} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label={`Passport - № (${value})`}
              name="persons_.passport_number"
            >
              <Input
                placeholder="1234567"
                minLength={7}
                type="number"
                maxLength={7}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Jinsi" name="persons_.gender_id">
              <Select placeholder="Jinsi" options={genderData} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Tug'ilgan sanasi" name="birthday">
              <Input type="date" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label={`Ilmiy daraja (${value})`} name="degree">
              <Input placeholder="Iqtisodiyot fanlari doktor" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label={`Ilmiy unvon (${value})`} name="scientific_title">
              <Input placeholder="professor" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Scopus ID" name="scopus_id">
              <Input placeholder="58816969400" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="ORCID" name="orchid">
              <Input placeholder="0009-0009-0009-0009" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Tajribasi (yil)" name="experienceYears">
              <Input type="number" placeholder="0" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Telefon 1" name="phone1">
              <Input placeholder="+998712990001" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Telefon 2" name="phone2">
              <Input placeholder="+99899 999-99-99" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Address" name="address">
              <Input placeholder="address" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="O'zbek tili (1-99)%" name="languages_uz">
              <Input
                type="number"
                placeholder="99"
                minLength={2}
                maxLength={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Ingliz tili (1-99)%" name="languages_en">
              <Input
                type="number"
                placeholder="50"
                minLength={2}
                maxLength={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Rus tili (1-99)%" name="languages_ru">
              <Input
                type="number"
                placeholder="90"
                minLength={2}
                maxLength={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Boshqa til nomi" name="languages_any_title">
              <Input placeholder="Koreys tili" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Boshqa til (1-99)%" name="languages_any">
              <Input
                type="number"
                placeholder="40"
                minLength={2}
                maxLength={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Rasm" name="img_up">
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Col span={16}>
          <Form.Item label={`Biografiya (${value})`} name="biography_json">
            <Input.TextArea placeholder={`Biografiya(${value})`} rows={4} />
          </Form.Item>
        </Col>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PersonComponent;
