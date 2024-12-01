import React from "react";
import { Container } from "./style";

const Book = ({ img, title, desc }) => {
  return (
    <Container data-aos="zoom-in">
      <img loading="lazy"  src={img} alt="" />
      <div className="book-wrap">
        <div className="book-title">{title}</div>
        <div className="book-desc">{desc}</div>
      </div>
    </Container>
  );
};

export default Book;
