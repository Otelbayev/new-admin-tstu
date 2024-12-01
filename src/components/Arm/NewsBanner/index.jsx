import React from "react";
import { Content } from "./style";

const NewsBanner = ({ prop }) => {
  return (
    <Content>
      <img className="news-img" loading="lazy" src={prop?.img} alt="" />
      <div className="news-abs">
        <div className="news-abs__top">{prop?.top}</div>
        <div className="news-abs__title">{prop?.title}</div>
        <div className="news-abs__bottom">
          {prop.bottom?.length &&
            prop?.bottom.map((e, index) => <span key={index}>{e}</span>)}
        </div>
      </div>
    </Content>
  );
};

export default NewsBanner;
