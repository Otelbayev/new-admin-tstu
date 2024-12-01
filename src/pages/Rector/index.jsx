import React, { useState } from "react";
import callCenter from "../../assets/images/callRector.png";
import { Content, Item } from "./style";
import Oferma from "./Oferma";
import Check from "./Check";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Rector = () => {
  const [send, setSend] = useState(true);
  const [check, setCheck] = useState(false);
  const [oferma, setOferma] = useState(false);

  const { t } = useTranslation();

  const onItemClick = ({ target: { id } }) => {
    switch (id) {
      case "send":
        setSend(true);
        setCheck(false);
        setOferma(false);
        break;
      case "check":
        setSend(false);
        setCheck(true);
        setOferma(false);
        break;
      case "oferma":
        setSend(false);
        setCheck(false);
        setOferma(true);
        break;
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {t("appeal.title1")} {t("appeal.title2")}
          {t("appeal.title3")}
        </title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <div className="content">
              <div className="content__left">
                <div className="content__left__title">
                  {t("appeal.title1")}{" "}
                  <span className="content__left__title__span">
                    {t("appeal.title2")}{" "}
                  </span>
                  {t("appeal.title3")}
                </div>
                <div className="content__left__img">
                  <img loading="lazy" src={callCenter} alt="" />
                </div>
              </div>
              <div className="content__right">
                <div className="content__right__top">
                  <Item
                    type={send.toString()}
                    className="content__right__top__item"
                    onClick={onItemClick}
                    id={"send"}
                  >
                    {t("appeal.btn1")}
                  </Item>
                  <Item
                    type={check.toString()}
                    className="content__right__top__item"
                    onClick={onItemClick}
                    id={"check"}
                  >
                    {t("appeal.btn2")}
                  </Item>
                  <Item
                    type={oferma.toString()}
                    className="content__right__top__item"
                    onClick={onItemClick}
                    id={"oferma"}
                  >
                    {t("appeal.btn3")}
                  </Item>
                </div>
                <div className="content__right__desc">
                  {send && t("appeal.desc")}
                  {check && t("appeal.email")}
                  {oferma && ""}
                </div>
                {send && <Form />}
                {check && <Check />}
                {oferma && <Oferma />}
              </div>
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Rector;
