import React from "react";
import { News } from "./style";
import { getDate } from "./../../../utils/month";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsItem = ({ item }) => {
  const date = getDate(item?.event_date?.split("T")[0]);
  const date1 = date?.split(",")[0]?.split(" ");
  const { i18n } = useTranslation();
  return (
    <News>
      <div className="item-left">
        <div>{date1?.length && date1[1]}</div>{" "}
        <div className="dek">{date1?.length && date1[0]}</div>
      </div>
      <div className="item-center">
        <div className="item-center__title">
          {item?.title?.split(" ")?.length <= 4
            ? item.title
            : item?.title?.split(" ")?.slice(0, 3)?.join(" ") + "..."}
        </div>
        <div className="item-center__subtitle">{date} | TSTU Universiteti</div>
      </div>
      <div className="item-right">
        <NavLink
          to={`/${i18n.language}/blog/${
            i18n.language === "uz" ? item?.id : item?.blog_id
          }`}
          className="item-right__link"
        >
          {i18n.language === "uz"
            ? "Batafsil"
            : i18n.language === "ru"
            ? "Подробнее"
            : "More"}
        </NavLink>
      </div>
    </News>
  );
};

export default NewsItem;
