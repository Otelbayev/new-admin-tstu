import React, { useEffect, useRef, useState } from "react";
import { Center, Content, Flex, Grid, Layout } from "./style";
import NewsItem from "../../components/News/NewsItem";
import { useNavigate } from "react-router-dom";
import MiniItem from "../../components/News/MiniItem";
import NewsCart from "../../components/News/NewsCart";
import { useTranslation } from "react-i18next";
import { Empty, Pagination, Radio } from "antd";
import { useBlog } from "../../hooks/useBog";
import axios from "axios";

const Blog = () => {
  const queryParams = new URLSearchParams(location.search);
  const [category, setCategory] = useState([]);
  const [top, setTop] = useState([]);
  const [cat, setCat] = useState(queryParams.get("category") || "all");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data, page, setPage, query, setQuery } = useBlog(cat, false, true);
  const newsRef = useRef(null);

  const getCategory = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcategorycontroller/sitegetallblogcategory`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcategorycontroller/sitegetallblogcategorytranslation?language_code=${
            i18n.language
          }`
    );
    res.status === 200 && setCategory(res?.data);
  };

  const getTop = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblog?pageNum=1&blog_category=Yangiliklar&favorite=true`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblogtranslation?language_code=${
            i18n.language
          }&blog_category_uz=Yangiliklar&favorite=true`
    );

    res.status === 200 && setTop(res?.data);
  };

  const radioChange = (e) => {
    setCat(e.target.value);
    setPage(1);
    queryParams.set("page", 1);
    queryParams.set("category", e.target.value);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  };

  useEffect(() => {
    getCategory();
    getTop();
  }, [i18n.language]);

  useEffect(() => {
    newsRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageChange = (a, b) => {
    setPage(a);
    setQuery(b);
    queryParams.set("page", a);
    queryParams.set("query", b);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  };

  return (
    <div className="root-container">
      <div className="root-wrapper">
        <Content>
          <div className="title">{t("news.u")}</div>
          <div className="ccontent">
            <div className="ccontent__item" data-aos="fade-right">
              <div className="ccontent__item__banner">
                <NewsItem
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz"
                          ? top?.list[0]?.id
                          : top?.list[0]?.blog_id
                      }`
                    )
                  }
                  prop={top?.list?.length ? top?.list[0] : []}
                />
              </div>
              <div className="ccontent__item__box">
                {top?.list?.slice(1, 5).map((item) => (
                  <MiniItem
                    key={item.id}
                    prop={item}
                    onClick={() =>
                      navigate(
                        `/${i18n.language}/blog/${
                          i18n.language === "uz" ? item.id : item?.blog_id
                        }`
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div className="ccontent__item" data-aos="fade-left">
              <div className="ccontent__item__banner">
                <NewsItem
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz"
                          ? top?.list[6]?.id
                          : top?.list[6]?.blog_id
                      }`
                    )
                  }
                  prop={top?.list?.length ? top?.list[6] : []}
                />
              </div>
              <div className="ccontent__item__box">
                {top?.list?.slice(7, 11).map((item) => (
                  <MiniItem
                    key={item.id}
                    prop={item}
                    onClick={() =>
                      navigate(
                        `/${i18n.language}/blog/${
                          i18n.language === "uz" ? item.id : item?.blog_id
                        }`
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <Center>
            <Radio.Group value={cat} onChange={radioChange}>
              <Radio value="all" checked={"all" === cat}>
                <div className="radio">{t("news.b")}</div>
              </Radio>
              {category?.map((e) => (
                <Radio
                  key={e.id}
                  value={
                    i18n.language === "uz" ? e.title : e?.blog_category_?.title
                  }
                  checked={e.id === cat}
                >
                  <div className="radio">{e.title}</div>
                </Radio>
              ))}
            </Radio.Group>
          </Center>
          {data?.list?.length ? (
            <Grid ref={newsRef}>
              {data?.list.map((e) => (
                <NewsCart
                  dataAos="zoom-in"
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? e.id : e?.blog_id
                      }`
                    )
                  }
                  key={e.id}
                  prop={e}
                />
              ))}
            </Grid>
          ) : (
            <Empty data-aos="zoom-in" />
          )}
          {data?.length ? (
            <div className="d-flex justify-content-center">
              <Pagination
                total={data?.length}
                className="my-3"
                current={page}
                pageSize={query}
                onChange={pageChange}
                style={{ textAlign: "center", marginBottom: "20px" }}
              />
            </div>
          ) : null}
        </Content>
      </div>
    </div>
  );
};

export default Blog;
