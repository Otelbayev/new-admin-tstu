import React from "react";
import { Container } from "./style";

const FackBottom = ({ data }) => {
  return (
    <Container data-aos="fade-up">
      {data.map(({ id, img, title, link }) => (
        <Container.Item key={id}>
          {img}
          <Container.Title>{title}</Container.Title>
          <Container.Link>
            {link} <Container.Icon />
          </Container.Link>
        </Container.Item>
      ))}
    </Container>
  );
};

export default FackBottom;
