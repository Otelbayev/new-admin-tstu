import React from "react";
import { Container } from "./style";

const ShowcaseBottom = ({ prop }) => {
  return (
    <Container data-aos="fade-up">
      {prop?.length &&
        prop.map((item) => (
          <Container.Item>
            <Container.Count>
              {item?.num}
              {item?.add}
            </Container.Count>
            <Container.Sub>{item?.sub}</Container.Sub>
          </Container.Item>
        ))}
    </Container>
  );
};

export default ShowcaseBottom;
