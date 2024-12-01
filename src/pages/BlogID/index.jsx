import React, { useEffect, useState } from "react";
import { Container } from "./style";
import TopNews from "../../components/News/TopNews";
import { Title } from "../../components/Generics";
import VideoCart from "../../components/News/VideoCart";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getDate } from "../../utils/month";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useBlogsContext } from "../../context/BlogsContext";

const BlogID = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { blogs, topNews, setTopNews } = useBlogsContext();

  const [data, setData] = useState({});

  const getTopNews = async () => {
    if (
      topNews?.list?.length === 0 ||
      topNews?.language_code !== i18n.language
    ) {
      const res = await axios.get(
        i18n.language === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetallblog?pageNum=1&favorite=true`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetallblogtranslation?pageNum=1&language_code=${
              i18n.language
            }&favorite=true`
      );
      if (res.status === 200) {
        setTopNews(res.data);
      }
    }
  };

  const fetchData = async () => {
    const blog = blogs.list?.find((e) => {
      if (i18n.language === "uz") {
        return e.id == id;
      }
      return e.blog_id == id;
    });
    if (blog?.id && blogs.language_code === i18n.language) {
      setData(blog);
    } else if (i18n.language === "uz" && !blog?.language_?.code && blog?.id) {
      setData(blog);
    } else {
      try {
        const res = await axios.get(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/blogcontroller/sitegetbyidblog/${id}`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/blogcontroller/sitegetbyuzidblogtranslation/${id}?language_code=${
                i18n.language
              }`
        );
        if (res.status === 200) {
          setData(res.data);
        } else {
          setData({});
        }
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch blog data:", error);
        setData({});
      }
    }
  };

  useEffect(() => {
    fetchData();
    getTopNews();
  }, [id, i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <Helmet>
        <title>{data?.title}</title>
        <meta name="description" content={data?.title} />
      </Helmet>

      <div className="root-container">
        <div className="root-wrapper">
          <Container>
            <div className="title">{data?.title}</div>
            <div className="news-date">
              <span>
                {getDate(data?.event_date?.split("T")[0])} -{" "}
                {getDate(data?.event_end_date?.split("T")[0])}
              </span>
              <span>
                {data?.blog_category_?.title ||
                  data?.blog_category_translation_?.title}
              </span>
            </div>
            <div className="content">
              <div className="content__left">
                <img
                  loading="lazy"
                  src={`${import.meta.env.VITE_BASE_URL_IMG}${
                    data?.img_?.url || data?.img_translation_?.url
                  }`}
                  style={{ width: "100%" }}
                  alt=""
                />
                <div
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                  data-aos="fade-up"
                  className="my-5"
                />
              </div>
              <div className="content__right">
                <TopNews data={topNews?.list} dataAos="fade-left" />
              </div>
            </div>
            <Title title={t("news.t")} button={t("news.btn")} to={`blog`}>
              <div className="newsid-bottom">
                {topNews?.list
                  ?.filter((e) => e.id != id)
                  ?.slice(0, 2)
                  .map((e) => (
                    <VideoCart
                      dataAos={"zoom-in"}
                      key={e.id}
                      prop={e}
                      to={`blog/${i18n.language === "uz" ? e?.id : e?.blog_id}`}
                    />
                  ))}
              </div>
            </Title>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BlogID;
