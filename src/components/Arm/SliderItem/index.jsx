import React from "react";
import { Content } from "./style";

const SliderItem = ({ prop }) => {
  return (
    <Content $reverse={prop?.reverse.toString()} data-aos="zoom-in">
      <div className="slider-content">
        <img loading="lazy" src={prop.img} alt="" className="slider-content__img" />
        <div className="slider-content__cart">{prop?.title}</div>
      </div>
    </Content>
  );
};

export default SliderItem;
