import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import { useIpContext } from "../../../context/IpContext/index";
import { useDepartmentContext } from "../../../context/DepartmentContext/index";
import { useLearningFormContext } from "../../../context/LearningForm";
import { useEducationLanguageContext } from "../../../context/EducationLanguage";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStudentGroup = () => {
  const { ip } = useIpContext();
  const [form] = Form.useForm();
  const role = Cookies.get("role");

  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { learningForm, getLangForm } = useLearningFormContext();
  const { eduLanguage, getEduLang } = useEducationLanguageContext();

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading!" });
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API}/studentgroup/createstudentgroup${
          role !== "admin" ? "faculty" : ""
        }`,
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "key", content: "Success!" });
        navigate(`/${i18n.language}/admin/student-group`);
      }
    } catch (err) {
      message.error({ key: "key", content: "Error!" });
    }
  };

  useEffect(() => {
    getSelectDepartment("uz");
    getEduLang();
    getLangForm();
  }, []);

  useEffect(() => {
    form.setFieldValue("learning_form_id", learningForm[0]?.value);
  }, [learningForm]);

  useEffect(() => {
    form.setFieldValue("education_language_id", eduLanguage[0]?.value);
  }, [eduLanguage]);

  useEffect(() => {
    form.setFieldValue("departament_id", departmentOptions[1]?.value);
  }, [departmentOptions]);

  return (
    <Wrapper title="Gruh qo'shish">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Nomi"
              name="name"
              rules={[{ required: true, message: "Kiritish majburiy!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Talabalar soni"
              name="students_count"
              rules={[{ required: true, message: "Kiritish majburiy!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {role === "admin" && (
            <Col xs={24} md={8}>
              <Form.Item label="Bo'lim" name="departament_id">
                <Select options={departmentOptions} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={role === "admin" ? 6 : 8}>
            <Form.Item label="Ta'lim shakli" name="learning_form_id">
              <Select options={learningForm} />
            </Form.Item>
          </Col>
          <Col xs={24} md={role === "admin" ? 6 : 8}>
            <Form.Item label="O'quv tili" name="education_language_id">
              <Select options={eduLanguage} />
            </Form.Item>
          </Col>
          <Col xs={24} md={role === "admin" ? 6 : 8}>
            <Form.Item label="Kirgan yil" name="year_of_adoption">
              <InputNumber
                rules={[{ required: true, message: "Kiritish majburiy!" }]}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={role === "admin" ? 6 : 8}>
            <Form.Item label="Tugatadigan yil" name="graduation_year">
              <InputNumber
                rules={[{ required: true, message: "Kiritish majburiy!" }]}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              yaratish
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddStudentGroup;
