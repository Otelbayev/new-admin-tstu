import React from "react";
import { Container, Icons } from "./style";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Container className="root-container">
      <div className="root-wrapper about " data-aos="fade-up">
        <div className="about__title">{t("about.title")}</div>
        <div className="about__desc">{t("about.desc")}</div>

        <div className="about__boxes">
          <div className="about__boxes__box">
            <Icons.Icon1 />
            <div className="about__boxes__box__count">21453+</div>
            <div className="about__boxes__box__min">{t("about.talaba")}</div>
          </div>
          <div className="about__boxes__box">
            <Icons.Icon2 />
            <div className="about__boxes__box__count">1193+</div>
            <div className="about__boxes__box__min">{t("about.professor")}</div>
          </div>
          <div className="about__boxes__box">
            <Icons.Icon3 />
            <div className="about__boxes__box__count">148+</div>
            <div className="about__boxes__box__min">{t("about.doktarant")}</div>
          </div>
          <div className="about__boxes__box">
            <Icons.Icon4 />
            <div className="about__boxes__box__count">57</div>
            <div className="about__boxes__box__min">{t("about.yonalish")}</div>
          </div>
          <div className="about__boxes__box">
            <Icons.Icon5 />
            <div className="about__boxes__box__count">12</div>
            <div className="about__boxes__box__min">{t("about.qoshimcha")}</div>
          </div>
          <div className="about__boxes__box">
            <Icons.Icon6 />
            <div className="about__boxes__box__count">9</div>
            <div className="about__boxes__box__min">{t("about.fakultet")}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
