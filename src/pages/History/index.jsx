import React from "react";
import UniShowcase from "./../../components/UniShowcase/index";
import { useTranslation } from "react-i18next";
import { Container } from "./style";
import UzHistory from "./uz-history";
import RuHistory from "./ru-history";
import EnHistory from "./en-history";
import { Helmet } from "react-helmet";

const History = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("history")}</title>
        <meta
          name="description"
          content={
            "Toshkent davlat transport universiteti 1931 yilda O’rta Osiyo temir yo’l transporti muhandislari instituti (SAZIIT) nomi ostida tashkil etilgan bo’lib, u o’z faoliyatini mutaxassislar – mexanikalar va operatorlarni tayyorlash bilan boshladi."
          }
        />
      </Helmet>
      <UniShowcase title={t("history")} />
      <div className="root-container">
        <div className="root-wrapper">
          <Container>
            {i18n.language === "uz" ? (
              <UzHistory />
            ) : i18n.language === "ru" ? (
              <RuHistory />
            ) : (
              <EnHistory />
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default History;
