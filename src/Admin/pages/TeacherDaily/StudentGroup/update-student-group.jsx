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
import { useNavigate, useParams } from "react-router-dom";
import { useStatusContext } from "../../../context/Status";
import { useTranslation } from "react-i18next";

const UpdateStudentGroup = () => {
  const { ip } = useIpContext();
  const [form] = Form.useForm();
  const { id } = useParams();
  const role = Cookies.get("role");

  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const { learningForm, getLangForm } = useLearningFormContext();
  const { eduLanguage, getEduLang } = useEducationLanguageContext();
  const { statusData, getStatus } = useStatusContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (values) => {
    values.request_ip = ip;
    try {
      message.loading({ key: "key", content: "Loading!" });
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_API}/studentgroup/updatestudentgroup${
          role !== "admin" ? "faculty" : ""
        }/${id}`,
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

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/studentgroup/getbyidstudentgroup${
        role !== "admin" ? "faculty" : ""
      }/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    res.status === 200 &&
      form.setFieldsValue({
        name: res.data.name,
        students_count: res.data.students_count,
        departament_id: res.data.departament_?.id,
        learning_form_id: res.data?.learning_form_?.id,
        education_language_id: res.data?.education_language_?.id,
        is_active: res.data.is_active,
        status_id: res.data.status_?.id,
        year_of_adoption: res.data.year_of_adoption,
        graduation_year: res.data.graduation_year,
      });
    console.log(res.data);
  };

  useEffect(() => {
    getStatus("uz");
    getSelectDepartment("uz");
    getEduLang();
    getLangForm();
    getData();
  }, []);

  return (
    <Wrapper title="Gruhni o'zgartirish">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Nomi"
              name="name"
              rules={[{ required: true, message: "kiritish majburiy!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Talabalar soni"
              name="students_count"
              rules={[{ required: true, message: "kiritish majburiy!" }]}
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
          <Col xs={24} md={8}>
            <Form.Item label="Ta'lim shakli" name="learning_form_id">
              <Select options={learningForm} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="O'quv tili" name="education_language_id">
              <Select options={eduLanguage} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Kirgan yil"
              rules={[{ required: true, message: "kiritish majburiy!" }]}
              name="year_of_adoption"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Tugatadigan yil"
              rules={[{ required: true, message: "kiritish majburiy!" }]}
              name="graduation_year"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {role === "admin" && (
            <Col sx={24} md={8}>
              <Form.Item name="is_active" label="Is Active">
                <Select
                  options={[
                    { value: true, label: "True" },
                    { value: false, label: "False" },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
          {role === "admin" && (
            <Col sx={24} md={8}>
              <Form.Item name="status_id" label="Status">
                <Select options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              update
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UpdateStudentGroup;
