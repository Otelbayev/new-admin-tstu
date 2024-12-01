import React, { useEffect, useState } from "react";
import UniShowcase from "./../../components/UniShowcase/index";
import { useTranslation } from "react-i18next";
import { useDepartment } from "./../../hooks/useDepartment";
import { useNavigate } from "react-router-dom";
import { Content } from "../Mdirections/style";
import { Helmet } from "react-helmet";

const Bdirections = () => {
  const { t, i18n } = useTranslation();
  const { data } = useDepartment("Fakultet");
  const naviagte = useNavigate();

  const [value, setValue] = useState(null);
  const [dep, setDep] = useState([]);
  const [fak, setFak] = useState("");

  useEffect(() => {
    setValue(
      data?.list?.length
        ? i18n.language === "uz"
          ? data?.list[0].id
          : data?.list[0]?.departament_?.id
        : null
    );
    setFak(data?.length ? data?.list[0]?.title : null);
  }, [i18n.language, data]);

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamentfacultychild/${value}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamenttranslationfacultychild/${value}?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) => {
        setDep(
          res?.filter(
            (e) =>
              e?.departament_type_?.type === "Bakalavriat yo'nalishlari" ||
              e?.departament_type_translation_?.departament_type_?.type ===
                "Bakalavriat yo'nalishlari"
          )
        );
      });
  }, [value]);

  return (
    <div>
      <Helmet>
        <title>{t("Bdirections.title")}</title>
      </Helmet>

      <Content>
        <UniShowcase title={t("Bdirections.title")} />
        <div className="root-container">
          <div className="root-wrapper py-3">
            <div className="buttons">
              {data?.list?.map((e, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setValue(
                      i18n.language === "uz" ? e.id : e?.departament_?.id
                    );
                    setFak(e.title);
                  }}
                  value={e.id}
                  className={
                    (i18n.language === "uz" ? e.id : e?.departament_?.id) ===
                      value && "active"
                  }
                >
                  <div className="radio-title ">{e.title}</div>
                </button>
              ))}
            </div>
            <div className="dep">
              {dep?.map((e) => (
                <div className="dep__item" key={e.id}>
                  <div className="dep__item__top">
                    <div className="dep__item__top__title">{e.description}</div>
                    <button
                      onClick={() =>
                        naviagte(
                          `/${i18n.language}/department/${
                            i18n.language === "uz" ? e.id : e.departament_?.id
                          }`
                        )
                      }
                    >
                      {t("Bdirections.btn")}
                    </button>
                  </div>
                  <div>
                    <div>
                      {t("Bdirections.fak")} <span>{fak}</span>
                    </div>
                    <div>
                      {t("Bdirections.dep")}
                      <span>{e.title}</span>
                    </div>
                  </div>
                  <div className="dep__item__bottom">
                    <div className="dep__item__bottom__item">
                      <div className="tit"> {t("Bdirections.dd1")}</div>
                    </div>
                    <div className="dep__item__bottom__item">
                      <div className="tit">{t("Bdirections.dd2")}</div>
                    </div>
                    <div className="dep__item__bottom__item">
                      <div className="tit">{t("Bdirections.dd3")}</div>
                    </div>
                    <div className="dep__item__bottom__item">
                      <div className="tit">{t("Bdirections.dd4")}</div>
                    </div>
                    <div className="dep__item__bottom__item">
                      <div className="tit">{t("Bdirections.dd5")}</div>
                    </div>
                    <div className="dep__item__bottom__item">
                      <div className="tit">{t("Bdirections.dd6")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Bdirections;
