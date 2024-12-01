import React, { useEffect, useState } from "react";
import FacultyCart from "../../components/Faculties/FacultyCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Content } from "../Faculties/style";
import { Pagination } from "antd";
import Loading2 from "../../components/Loading2";
import { Helmet } from "react-helmet";
import { useKafedras } from "../../hooks/useKafedras";
import Error from "../../components/Error";

const Faculties = () => {
  const { kafedras, loading, error } = useKafedras();

  const url = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(url.get("page") || 1);

  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(kafedras?.list?.slice((page - 1) * 9, page * 9));
  }, [page, kafedras]);

  const { t, i18n } = useTranslation();

  const naviagte = useNavigate();

  const pageChange = (a) => {
    setPage(a);
    const newUrl = `${window.location.pathname}?page=${a}`;
    window.history.replaceState(null, null, newUrl);
  };

  if (loading) {
    return <Loading2 />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Helmet>
        <title>{t("faculties.kafedra")}</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <div className="title">{t("faculties.kafedra")}</div>
            <Content.Body>
              {data?.map((item) => {
                return (
                  <FacultyCart
                    key={item?.id}
                    item={item}
                    onClick={() =>
                      naviagte(
                        `${
                          i18n.language === "uz"
                            ? item?.id
                            : item?.departament_?.id
                        }`
                      )
                    }
                    type="kafedra"
                  />
                );
              })}
            </Content.Body>
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                total={kafedras?.list?.length}
                current={page}
                onChange={pageChange}
              />
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Faculties;
