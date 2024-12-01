import React from "react";
import { Content, Icon } from "./style";

const Tadbir = ({ prop, dataAos, onClick }) => {
  return (
    <Content data-aos={dataAos}>
      <div className="video-cart-left">
        <img loading="lazy" src={prop?.img} alt="" />
      </div>
      <div className="video-cart-right">
        <div className="video-cart-right__date">
          <span>
            {prop?.icon && <Icon.User />} {prop?.left}
          </span>
          <span>
            {prop?.icon && <Icon.Calendar />} {prop?.right}
          </span>
        </div>
        <div className="video-cart-right__title" onClick={onClick}>
          {prop?.title}
        </div>
        <div className="video-cart-right__desc">{prop?.desc}</div>
      </div>
    </Content>
  );
};

export default Tadbir;
