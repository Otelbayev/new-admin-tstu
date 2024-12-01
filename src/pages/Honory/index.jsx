import React, { useEffect, useState } from "react";
import UniShowcase from "../../components/UniShowcase";
import { useTranslation } from "react-i18next";
import { Content, Item } from "./style";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "./../../hooks/useEmployee";
import { Helmet } from "react-helmet";

const Honory = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useEmployee("Faxriy professor");

  return (
    <div>
      <Helmet>
        <title>{t("honory.title")}</title>
      </Helmet>
      <UniShowcase title={t("honory.title")} />
      <div className="root-container">
        <div className="root-wrapper">
          <Content>
            <div className="content">
              {data?.map((e, index) => (
                <Item id={index} key={e?.id} className={"content__item"}>
                  <img
                    loading="lazy"
                    src={`${import.meta.env.VITE_BASE_URL_IMG}${
                      e?.persons_?.img_?.url ||
                      e?.persons_translation_?.persons_?.img_?.url
                    }`}
                    alt=""
                    className="content__item__img"
                  />
                  <div className="content__item__data">
                    <div className="content__item__data__fio">
                      {e?.persons_?.firstName ||
                        e?.persons_translation_?.persons_?.firstName}{" "}
                      {e?.persons_?.lastName ||
                        e?.persons_translation_?.persons_?.lastName}{" "}
                      {e?.persons_?.fathers_name ||
                        e?.persons_translation_?.persons_?.fathers_name}
                    </div>
                    <div className="content__item__data__position">
                      {e?.degree || "position"}
                    </div>
                    <ul className="content__item__data__ul">
                      {e?.experience_json?.split(";").map((e, index) => (
                        <li key={index}>{e}.</li>
                      ))}{" "}
                    </ul>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/${i18n.language}/employee/${
                            i18n.language === "uz" ? e.id : e?.persons_data_id
                          }`
                        )
                      }
                    >
                      Batafsil
                    </button>
                  </div>
                </Item>
              ))}
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Honory;
