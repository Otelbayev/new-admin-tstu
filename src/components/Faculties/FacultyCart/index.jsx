import React from "react";
import { Container } from "./style";

const FacultyCart = ({ item, onClick, type }) => {
  return (
    <Container
      onClick={onClick}
      $bg={`${import.meta.env.VITE_BASE_URL_IMG}${item?.img_?.url}`}
    >
      {type === "kafedra" ? (
        <div className="kafedra" data-aos="zoom-in">
          <p className="kafedra-title card-title">{item?.title}</p>
          <img
            loading="lazy"
            src={`${import.meta.env.VITE_BASE_URL_IMG}${item?.img_?.url}`}
            alt=""
          />
        </div>
      ) : (
        <div className="card">
          <div className="card-front">
            <img
              loading="lazy"
              src={`${import.meta.env.VITE_BASE_URL_IMG}${
                item?.img_icon_?.url
              }`}
            />
            <p className="card-title">{item?.title}</p>
          </div>
          <div className="card-back">
            <p className="card-title">{item?.title}</p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default FacultyCart;
