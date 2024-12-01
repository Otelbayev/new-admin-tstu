import React, { useEffect, useMemo } from "react";
import LargeBanner from "../LargeBanner";
import NewsItem from "../NewsItem";
import { Title } from "../../Generics";
import { Layout } from "./style";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBlogsContext } from "../../../context/BlogsContext";

const Events = ({ type }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { events, setEvnts } = useBlogsContext();

  const fetchData = async (title, favo) => {
    const url =
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblog?blog_category=${title}&favorite=${favo}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblogtranslation?language_code=${
            i18n.language
          }&blog_category_uz=${title}&favorite=${favo}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (
        events.list?.length === 0 ||
        events?.language_code !== i18n.language
      ) {
        const d1 = await fetchData("Kutilayotgan tadbirlar", true);
        setEvnts(d1);
      }
    };
    fetchAllData();
  }, [i18n.language]);

  const d1 = useMemo(() => {
    return events?.list?.sort((a, b) => b.id - a.id);
  }, [events]);

  return (
    <Layout className="root-container">
      <div className="root-wrapper">
        <Title title={t("events.title")} to="news">
          <div className="grid">
            <div className="grid__item first" data-aos="fade-up">
              <LargeBanner
                onClick={() =>
                  navigate(
                    `/${i18n.language}/blog/${
                      i18n.language === "uz" ? d1[0]?.id : d1[0]?.blog_id
                    }`
                  )
                }
                item={d1 && d1[0]}
                type={type}
              />
              <LargeBanner
                onClick={() =>
                  navigate(
                    `/${i18n.language}/blog/${
                      i18n.language === "uz" ? d1[1]?.id : d1[1]?.blog_id
                    }`
                  )
                }
                item={d1 && d1[1]}
                type={type}
              />
            </div>
            <div className="grid__item second" data-aos="fade-up">
              <LargeBanner
                onClick={() =>
                  navigate(
                    `/${i18n.language}/blog/${
                      i18n.language === "uz" ? d1[2]?.id : d1[2]?.blog_id
                    }`
                  )
                }
                item={d1 && d1[2]}
                type={type}
              />
            </div>
            <div className="grid__news thrid" data-aos="fade-up">
              {d1?.slice(3)?.map((e) => (
                <NewsItem item={e} key={e.id} />
              ))}
            </div>
          </div>
        </Title>
      </div>
    </Layout>
  );
};

export default Events;
