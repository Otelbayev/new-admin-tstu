import React from "react";
import title from "../../assets/images/title.png";
import mobile from "../../assets/images/mobiletitle.png";
import { useTranslation } from "react-i18next";

const Showcase = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="c-showcase">
      <div className="c-wrapper">
        {i18n.language === "uz" ? (
          <>
            <img
              src={title}
              alt="TSTU"
              className="c-desktop-title c-title"
              data-aos="zoom-in"
              loading="lazy"
            />
            <img
              src={mobile}
              alt="TSTU"
              className="c-mobile-title c-title"
              data-aos="zoom-in"
              loading="lazy"
            />
          </>
        ) : (
          <h1 className="c-title">{t("name")}</h1>
        )}
      </div>
    </div>
  );
};

export default Showcase;
