import React, { useEffect } from "react";
import Wrapper from "../../../components/wrapper";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useIpContext } from "../../../context/IpContext/index";
import Cookies from "js-cookie";
import DepartmentChaining from "../../../components/department-chaining";
import { useEducationLanguageContext } from "../../../context/EducationLanguage";
import { studyYears } from "../../../utils/mock";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const { ip } = useIpContext();
  const role = Cookies.get("role");
  const [form] = Form.useForm();
  const { eduLanguage, getEduLang } = useEducationLanguageContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onFinish = async (e) => {
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/academicsubject/createacademicsubject`,
        {
          name: e.name,
          audience_type: e.audience_type,
          departament_id: e.departament_id,
          education_language_id: e.education_language_id,
          old_year: e.old_year,
          new_year: e.old_year + 1,
          request_ip: ip,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success({ key: "key", content: "Success!" });
        navigate(`/${i18n.language}/admin/academi-subject`);
      }
    } catch (er) {
      message.error({ key: "key", content: "Error" });
    }
  };

  useEffect(() => {
    getEduLang();
  }, []);

  useEffect(() => {
    form.setFieldValue("education_language_id", eduLanguage[0]?.value);
  }, [eduLanguage]);

  return (
    <Wrapper title="Fan qo'shish">
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          old_year: new Date().getFullYear(),
          audience_type: "Audience",
        }}
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Iltimos nom kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {role === "admin" ? <DepartmentChaining form={form} /> : null}
          <Col xs={24} md={8}>
            <Form.Item name="education_language_id" label="Ta'lim tili">
              <Select options={eduLanguage} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="old_year" label="O'quv yili">
              <Select options={studyYears} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="audience_type" label="Fan turi">
              <Select
                options={[
                  { value: "Audience", label: "Maruza" },
                  { value: "NoAudience", label: "Amaliyot" },
                ]}
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

export default Add;
