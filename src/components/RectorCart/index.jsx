import React from "react";
import { Container, Content } from "./style";
import email from "../../assets/icons/rectorEmail.png";
import phone from "../../assets/icons/rectorPhone.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RectorCart = ({ data }) => {
  const { i18n } = useTranslation();

  return (
    <Container>
      <Content className="content">
        <Content.Front>
          <img
            loading="lazy"
            src={`${import.meta.env.VITE_BASE_URL_IMG}${
              data?.persons_?.img_?.url ||
              data?.persons_translation_?.persons_?.img_?.url
            }`}
            alt=""
          />
          <div className="position">
            {data?.persons_?.employee_type_?.title ||
              data?.persons_translation_?.employee_type_translation_
                ?.title}{" "}
            , {data?.degree}
          </div>
          <div className="name">
            {data?.persons_?.firstName || data?.persons_translation_?.firstName}{" "}
            {data?.persons_?.lastName || data?.persons_translation_?.lastName}{" "}
            {data?.persons_?.fathers_name ||
              data?.persons_translation_?.fathers_name}
          </div>
          <div className="bat-btn">
            <NavLink
              className={"btn btn-primary"}
              to={`/${i18n.language}/employee/${
                i18n.language === "uz" ? data?.id : data?.persons_data_id
              }`}
            >
              Batafsil
            </NavLink>
          </div>
        </Content.Front>
        <Content.Back>
          <img
            loading="lazy"
            src={`${import.meta.env.VITE_BASE_URL_IMG}${
              data?.persons_?.img_?.url ||
              data?.persons_translation_?.persons_?.img_?.url
            }`}
            alt=""
          />
          <div className="position">
            {data?.persons_?.employee_type_?.title ||
              data?.persons_translation_?.employee_type_translation_
                ?.title}{" "}
            , {data?.degree}
          </div>
          <div className="name">
            {data?.persons_?.firstName} {data?.persons_?.lastName}{" "}
            {data?.persons_?.fathers_name}
          </div>
          <div className="desc">{data?.desc}</div>
          {(data?.phone_number1 || data?.phone_number2) && (
            <div className="wrap">
              <img loading="lazy" src={phone} alt="" />
              <div>
                <div className="phone">
                  <NavLink to={`tel:${data?.phone_number1}`}>
                    {data?.phone_number1}
                  </NavLink>
                </div>
                <div className="phone">
                  <NavLink to={`tel:${data?.phone_number2}`}>
                    {data?.phone_number2}
                  </NavLink>
                </div>
              </div>
            </div>
          )}
          {(data?.persons_?.email || data?.persons_translation_?.email) && (
            <div className="wrap">
              <img loading="lazy" src={email} alt="" />
              <div>
                <div className="phone">
                  <NavLink
                    to={`mailto:${
                      data?.persons_?.email || data?.persons_translation_?.email
                    }`}
                  >
                    {data?.persons_?.email || data?.persons_translation_?.email}
                  </NavLink>
                </div>
              </div>
            </div>
          )}
          <NavLink
            className={"btn btn-primary"}
            to={`/${i18n.language}/employee/${
              i18n.language === "uz" ? data?.id : data?.persons_data_id
            }`}
          >
            Batafsil
          </NavLink>
        </Content.Back>
      </Content>
    </Container>
  );
};

export default RectorCart;
