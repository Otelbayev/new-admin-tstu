import React from "react";
import { Content } from "./style";
import { getDate } from "../../../utils/month";
import Image from "../../../components/Image";
import news from "../../../assets/images/news.jpg";

const NewsCart = ({ prop, onClick, dataAos }) => {
  return (
    <Content onClick={onClick} data-aos={dataAos}>
      <Image
        src={
          prop?.img_?.url || prop?.img_translation_?.url
            ? `${import.meta.env.VITE_BASE_URL_IMG}${
                prop?.img_?.url || prop?.img_translation_?.url
              }`
            : news
        }
      />
      <div className="news-cart-bottom">
        <div className="news-cart-bottom__mintitle">
          {prop?.blog_category_?.title ||
            prop?.blog_category_translation_?.title}
        </div>
        <div className="news-cart-bottom__title">{prop?.title}</div>
        <div className="news-cart-bottom__date">
          <span>
            {prop?.blog_category_?.title ||
              prop?.blog_category_translation_?.title}
          </span>
          <span>{getDate(prop?.event_date?.split("T")[0])}</span>
        </div>
      </div>
    </Content>
  );
};

export default NewsCart;
