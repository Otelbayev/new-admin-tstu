import React, { useState } from "react";
import { Title } from "../../Generics";
import IlmiyMarkazCart from "../../IlmiyMarkazCart";
import { DarkSection } from "./style";
import { useTranslation } from "react-i18next";
import { useDepartment } from "../../../hooks/useDepartment";

const Survery = () => {
  const { t, i18n } = useTranslation();
  const { data: favoMarkaz } = useDepartment("Ilmiy markaz", true);
  const [counterOn, setCounterOn] = useState(false);
  return (
    <DarkSection className="root-container">
      <div className="root-wrapper">
        <Title $type="dark" title={t("survery.title")}>
          <div>
            <div data-aos="fade-up" className="tadqiqot">
              <div className="tadqiqot__item ">
                <div className="mobile-flex">
                  <div className="tadqiqot__item__title">{t("survery.1")}</div>
                  <div className="tadqiqot__item__count">12</div>
                </div>
                <div className="tadqiqot__item__p">{t("survery.markaz")}</div>
              </div>
              <div className="tadqiqot__item ">
                <div className="mobile-flex">
                  <div className="tadqiqot__item__title">{t("survery.2")}</div>
                  <div className="tadqiqot__item__count">3</div>
                </div>
                <div className="tadqiqot__item__p">
                  {t("survery.kutubxona")}
                </div>
              </div>
              <div className="tadqiqot__item ">
                <div className="mobile-flex">
                  <div className="tadqiqot__item__title">{t("survery.3")}</div>
                  <div className="tadqiqot__item__count">100000</div>
                </div>
                <div className="tadqiqot__item__p">{t("survery.kitob")}</div>
              </div>
            </div>
          </div>
        </Title>
        <Title
          $type="dark"
          title={t("centers.title")}
          button={t("centers.btn")}
          subtitle={t("centers.desc")}
          to="scientific-center"
        >
          <div className="markaz">
            {favoMarkaz?.list
              ?.sort((a, b) => b.id - a.id)
              ?.slice(0, 4)
              ?.map((e) => (
                <IlmiyMarkazCart
                  dataAos={"fade-up"}
                  key={e.id}
                  to={`department/${
                    i18n.language === "uz" ? e?.id : e?.departament_?.id
                  }`}
                  item={e}
                />
              ))}
          </div>
        </Title>
      </div>
    </DarkSection>
  );
};

export default Survery;
