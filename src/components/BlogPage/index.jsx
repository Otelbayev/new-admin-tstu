import React from "react";
import { Title } from "../Generics";
import { Grid } from "../../pages/Blog/style";
import NewsCart from "../News/NewsCart";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import UniShowcase from "../UniShowcase";
import { Pagination } from "antd";
import { Helmet } from "react-helmet";

const BlogPage = ({ title, data, page, setPage }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const pageChange = (e) => {
    setPage(e);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", e);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  };

  return (
    <div>
      <Helmet>
        <title>{t(title)}</title>
      </Helmet>
      <UniShowcase title={t(title)} />
      <div className="root-container my-4">
        <div className="root-wrapper">
          {/* <Title title={t(title)} $border="none" /> */}
          <Grid>
            {data?.list?.map((e) => (
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
          <div className="d-flex justify-content-center">
            <Pagination
              total={data?.length}
              current={page}
              onChange={pageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
