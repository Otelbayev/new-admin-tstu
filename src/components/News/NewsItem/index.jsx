import React from "react";
import { Large, Btn } from "./style";
import { getDate } from "./../../../utils/month";
import { useTranslation } from "react-i18next";
import news from "../../../assets/images/news.jpg";

const NewsItem = ({ prop, onClick }) => {
  const { i18n } = useTranslation();
  return (
    <Large
      $img={
        prop?.img_?.url || prop?.img_translation_?.url
          ? `${import.meta.env.VITE_BASE_URL_IMG}${
              prop?.img_?.url || prop?.img_translation_?.url
            }`
          : news
      }
    >
      <div>
        <Large.Date>
          <span>
            {prop?.blog_category_?.title ||
              prop?.blog_category_translation_?.title}
          </span>
          <span>{getDate(prop?.event_date?.split("T")[0])}</span>
        </Large.Date>
        <Large.Title>{prop?.title}</Large.Title>
        <Btn onClick={onClick}>
          {i18n.language === "uz"
            ? "Batafsil"
            : i18n.language === "ru"
            ? "Подробнее"
            : "More"}
        </Btn>
      </div>
    </Large>
  );
};

export default NewsItem;
