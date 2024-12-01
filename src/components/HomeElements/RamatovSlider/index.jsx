import React from "react";
import { Container } from "./style";
import Image from "../../Image";

const RamatovSlider = ({ prop }) => {
  return (
    <Container data-aos="fade-up">
      <div className="item">
        <div className="item__content">
          <div className="slider-top">
            <Image
              src={`${import.meta.env.VITE_BASE_URL_IMG}${
                prop?.persons_?.img_?.url ||
                prop?.persons_translation_?.persons_?.img_?.url
              }`}
              alt=""
            />
            <div>
              <div className="slider-top__name">
                {prop?.persons_?.firstName ||
                  prop?.persons_translation_?.firstName}{" "}
                {prop?.persons_?.lastName ||
                  prop?.persons_translation_?.lastName}{" "}
                {prop?.persons_?.fathers_name ||
                  prop?.persons_translation_?.fathers_name}
              </div>
              <div className="slider-top__position">{prop?.degree}</div>
            </div>
          </div>
          <div
            className="slider-bottom"
            dangerouslySetInnerHTML={{
              __html: prop.biography_json,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default RamatovSlider;
