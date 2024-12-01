import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Title } from "../../Generics";
import { Layout } from "./style";
import LargeBanner from "../LargeBanner";
import Cart from "../Cart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBlogsContext } from "../../../context/BlogsContext";

const News = ({ type }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    news,
    setNews,
    dissertatsiya,
    setDissertatsiya,
    xalqaro,
    setXalqaro,
  } = useBlogsContext();

  const handleNavigation = useCallback(
    (id) => {
      navigate(`/${i18n.language}/blog/${id}`);
    },
    [navigate, i18n.language]
  );

  const fetchData = async (title, favo, pageNum, queryNum) => {
    const url =
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblog?blog_category=${title}&favorite=${favo}&pageNum=${pageNum}&queryNum=${queryNum}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblogtranslation?language_code=${
            i18n.language
          }&blog_category_uz=${title}&favorite=${favo}&pageNum=${pageNum}&queryNum=${queryNum}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (news.list?.length === 0 || news?.language_code !== i18n.language) {
        const d1 = await fetchData("Yangiliklar", true, 1, 2);
        setNews(d1);
      }

      if (
        xalqaro.list?.length === 0 ||
        xalqaro?.language_code !== i18n.language
      ) {
        const d2 = await fetchData("Xalqaro hamkorlik", true, 1, 2);
        setXalqaro(d2);
      }

      if (
        dissertatsiya.list?.length === 0 ||
        dissertatsiya?.language_code !== i18n.language
      ) {
        const d3 = await fetchData("Dissertatsiya ishi muhokamasi", true, 1, 2);
        setDissertatsiya(d3);
      }
    };

    fetchAllData();
  }, [i18n.language]);

  const sortedData1 = useMemo(
    () => news?.list?.sort((a, b) => b?.id - a?.id),
    [news]
  );
  const sortedData2 = useMemo(
    () => xalqaro?.list?.sort((a, b) => b?.id - a?.id),
    [xalqaro]
  );
  const sortedData3 = useMemo(
    () => dissertatsiya?.list?.sort((a, b) => b?.id - a?.id),
    [dissertatsiya]
  );

  const renderBanner = (data, index, Component) => (
    <Component
      item={data && data[index]}
      type={type}
      onClick={() =>
        handleNavigation(
          i18n.language === "uz" ? data?.[index]?.id : data?.[index]?.blog_id
        )
      }
    />
  );

  return (
    <Layout className="root-container">
      <div className="root-wrapper">
        <Title title={t("news.title")} button={t("news.btn")} to="blog">
          <div className="grid">
            <div data-aos="fade-up" className="grid__item1">
              {renderBanner(sortedData1, 0, LargeBanner)}
            </div>
            <div data-aos="fade-up" className="grid__item2">
              {renderBanner(sortedData1, 1, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item3">
              {renderBanner(sortedData2, 0, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item4">
              {renderBanner(sortedData2, 1, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item5">
              {renderBanner(sortedData3, 0, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item6">
              {renderBanner(sortedData3, 1, LargeBanner)}
            </div>
          </div>
        </Title>
      </div>
    </Layout>
  );
};

export default News;
