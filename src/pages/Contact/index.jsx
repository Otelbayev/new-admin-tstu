import React, { useEffect, useState } from "react";
import { Content, Left, Right, Btn, Inputs } from "./style";
import { Select } from "../../components/Generics";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import { message } from "antd";
import { Helmet } from "react-helmet";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t, i18n } = useTranslation();
  const [employemnt, setEmployment] = useState([]);
  const [emp, setEmp] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/employment/sitegetallemployment`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/employment/sitegetallemploymenttranslation?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) =>
        setEmployment(res.map((e) => ({ value: e.id, label: e.title })))
      );
  }, [i18n.language]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_p5a70av";
    const templateID = "template_5hx4gc8";
    const publicKey = "66gZgilC97nTCdbyJ";
    message.loading({ key: "msg", content: "Loading!" });

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name,
          email,
          message: JSON.stringify({
            name,
            email,
            employemnt: employemnt?.find((e) => e.value === emp)?.label,
            description: desc,
          }),
        },
        publicKey
      )
      .then((response) => {
        message.success({ key: "msg", content: "Email sent successfully!" });
        setName("");
        setEmail("");
        setDesc("");
      })
      .catch((error) => {
        message.error({ key: "msg", content: "Xatolik!" });
      });
  };

  return (
    <div>
      <Helmet>
        <title>{t("contact.title")}</title>
        <meta name="description" content={t("contact.desc")} />
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <Left>
              <Left.Title>{t("contact.title")}</Left.Title>
              <Left.Desc>{t("contact.desc")}</Left.Desc>
              <Left.Form onSubmit={handleSubmit}>
                <Select
                  height={46}
                  options={employemnt}
                  defaultValue={"Bandligi"}
                  value={emp}
                  onChange={(e) => setEmp(e)}
                />
                <Left.Div>
                  <Inputs
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                  <Inputs
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Left.Div>
                <Inputs
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description (optional)"
                />
                <Btn type={"primary"}>{t("contact.btn")}</Btn>
              </Left.Form>
            </Left>
            <Right>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11993.81247292006!2d69.2820477!3d41.2772419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8aac316ee659%3A0xc5be678c10cbba9b!2z0KLQsNGI0LrQtdC90YLRgdC60LjQuSDQk9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0KLRgNCw0L3RgdC_0L7RgNGC0L3Ri9C5INCj0L3QuNCy0LXRgNGB0LjRgtC10YI!5e0!3m2!1sru!2s!4v1711655518141!5m2!1sru!2s"
                loading="lazy"
              ></iframe>
            </Right>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Contact;
