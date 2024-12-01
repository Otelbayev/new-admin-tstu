import React from "react";
import { Container } from "./style";

const Video = ({ img, title, desc, reverse }) => {
  return (
    <Container $reverse={reverse}>
      <img loading="lazy" src={img} alt="" />
      <div className="video-right">
        <div className="video-right__title">{title}</div>
        <div className="video-right__desc">{desc}</div>
        <a href="">Batafsil o'qish</a>
      </div>
    </Container>
  );
};

export default Video;
