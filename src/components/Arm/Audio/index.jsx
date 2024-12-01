import React from "react";
import { Container } from "./style";

const Audio = ({ img, title, desc }) => {
  return (
    <Container data-aos="zoom-in">
      <img loading="lazy" src={img} alt="" />
      <div className="audio-right">
        <div className="audio-right__title">{title}</div>
        <div className="audio-right__desc">{desc}</div>
      </div>
    </Container>
  );
};

export default Audio;
