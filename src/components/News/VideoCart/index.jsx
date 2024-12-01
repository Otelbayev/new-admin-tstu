import React from "react";
import { Content } from "./style";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VideoCart = ({ prop, dataAos, to }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <Content
      data-aos={dataAos}
      onClick={() => navigate(`/${i18n.language}/${to}`)}
    >
      <div className="video-cart-left">
        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL_IMG}${
            prop?.img_?.url || prop?.img_translation_?.url
          }`}
          alt=""
        />
      </div>
      <div className="video-cart-right">
        <div className="video-cart-right__date">
          <span>{prop?.left}</span>
          <span>{prop?.right}</span>
        </div>
        <div className="video-cart-right__title">{prop?.title}</div>
        <div className="video-cart-right__desc">{prop?.description}</div>
        {/* <NavLink
          to={`/${i18n.language}/${to}`}
          className="video-cart-right__button"
        >
          {i18n.language === "uz"
            ? "Batafsil"
            : i18n.language === "ru"
            ? "Подробнее"
            : "More"}
        </NavLink> */}
      </div>
    </Content>
  );
};

export default VideoCart;
