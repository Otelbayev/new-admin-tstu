import React, { useEffect, useState } from "react";
import InteractiveCart from "../InteractiveCart";
import { DarkSection, Icons, InteraktiveCarts } from "./style";
import { Title } from "../../Generics";
import { NavLink } from "react-router-dom";
import mackbook from "../../../assets/images/Macbook.png";
import iMac from "../../../assets/images/iMac.png";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Interactive = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/sitegetallinteractiveservices?favorite=true`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/interactiveservices/sitegetallinteractiveservicestranslation?language_code=${
            i18n.language
          }&favorite=true`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status === 200 && setData(res.data);
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  return (
    <DarkSection className="root-container">
      <div className="root-wrapper">
        <Title
          $type="dark"
          title={t("interactive.title")}
          button={t("interactive.btn")}
          to="interactive-services"
        >
          <InteraktiveCarts data-aos="fade-up">
            <div className="first">
              <div className="first__left">
                <Icons.Int4 />
                <NavLink
                  to={`interactive-services`}
                  className="first__left__title"
                >
                  {t("interactive.desc")}
                </NavLink>
              </div>
              <div className="first__right">
                <img
                  loading="lazy"
                  src={mackbook}
                  alt=""
                  className="first__right__macbook"
                />
                <img
                  loading="lazy"
                  src={iMac}
                  alt=""
                  className="first__right__imac"
                />
              </div>
            </div>
            <div className="second">
              {data
                ?.sort((a, b) => b.id - a.id)
                ?.slice(0, 5)
                ?.map((e) => (
                  <InteractiveCart aos={"fade-up"} key={e?.id} prop={e} />
                ))}
            </div>
          </InteraktiveCarts>
        </Title>
      </div>
    </DarkSection>
  );
};

export default Interactive;
