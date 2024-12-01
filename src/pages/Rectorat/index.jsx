import React, { useEffect, useState } from "react";
import RectorCart from "../../components/RectorCart";
import { Content, Rector } from "./style";
import { useTranslation } from "react-i18next";
import { Title } from "../../components/Generics";
import { useEmployee } from "../../hooks/useEmployee";
import { Helmet } from "react-helmet";

const Rectorat = () => {
  const { t, i18n } = useTranslation();
  const [rector, setRector] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyidpersondata/1`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyuzidpersondatatranslation/${1}?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) => setRector(res));
  }, [i18n.language]);

  const { data: pro } = useEmployee("Prorektor");

  return (
    <div>
      <Helmet>
        <title>{t("rectorat")}</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper my-5">
          <Title title={t("rectorat")} $border="none" />
          <Rector>
            <RectorCart data={rector} />
          </Rector>
          <Content data-aos="fade-up">
            {pro?.map((e) => (
              <RectorCart key={e?.id} data={e} />
            ))}
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Rectorat;
