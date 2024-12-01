import React from "react";
import { useTranslation } from "react-i18next";

const Oferma = () => {
  const { t } = useTranslation();

  return (
    <div className="oferma" data-aos="fade-up">
      <div className="oferma__title">{t("appeal.oferma")}</div>
      <div className="oferma__top">{t("appeal.top")}</div>
      <div className="oferma__start">{t("appeal.start")}</div>
      <ul>
        <li>{t("appeal.li1")}</li>
        <li>{t("appeal.li2")}</li>
        <li>{t("appeal.li3")}</li>
        <li>{t("appeal.li4")}</li>
        <li>{t("appeal.li5")}</li>
        <li>{t("appeal.li6")}</li>
      </ul>
      <div className="oferma__bottom">{t("appeal.bottom")}</div>
    </div>
  );
};

export default Oferma;
