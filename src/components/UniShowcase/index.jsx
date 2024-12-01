import React from "react";
import { Container } from "./style";

const UniShowcase = ({ title }) => {
  return (
    <Container className="root-container">
      <div className="root-wrapper">
        <Container.Title data-aos="fade-right">{title}</Container.Title>
      </div>
    </Container>
  );
};

export default UniShowcase;
