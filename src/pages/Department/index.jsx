import React, { useEffect } from "react";
import { Content } from "../Centers/style";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDepartment } from "../../hooks/useDepartment";
import { Title } from "../../components/Generics";
import { Pagination } from "antd";
import Loading2 from "../../components/Loading2";

const Department = () => {
  const naviagte = useNavigate();
  const { t, i18n } = useTranslation();
  const { data, loading, error, page, setPage } = useDepartment("Bo'lim", true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const pageChange = (e) => {
    setPage(e);
    const newUrl = `${window.location.pathname}?page=${e}`;
    window.history.replaceState(null, null, newUrl);
  };

  if (loading) {
    return <Loading2 />;
  }

  if (!loading && error) {
    return <h1 className="text-center">Xatolik!</h1>;
  }

  return (
    <div>
      <Helmet>
        <title>{t("department.b")}</title>
        <meta name="description" content={t("department.b")} />
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Title title={t("department.b")} $border="none" />
          <Content data-aos="fade-up">
            {data?.list?.map((e) => (
              <Content.Item
                key={e.id}
                onClick={() =>
                  naviagte(
                    `/${i18n.language}/department/${
                      i18n.language === "uz" ? e?.id : e?.departament_?.id
                    }`
                  )
                }
              >
                <Content.Img
                  loading="lazy"
                  src={`${import.meta.env.VITE_BASE_URL_IMG}${
                    e?.img_?.url || e?.img_translation_?.url
                  }`}
                />
                <Content.Title>{e?.title}</Content.Title>
              </Content.Item>
            ))}
          </Content>
          <div className="d-flex justify-content-center my-4">
            <Pagination
              current={page}
              onChange={pageChange}
              total={data?.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
