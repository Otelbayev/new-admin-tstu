import React, { useEffect } from "react";
import { Content } from "./style";
import FacultyCart from "../../components/Faculties/FacultyCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useFaculties } from "../../hooks/useFaculties";
import Error from "../../components/Error";
import Loading2 from "../../components/Loading2";

const Faculties = () => {
  const naviagte = useNavigate();
  const { t, i18n } = useTranslation();

  const { data, loading, error } = useFaculties();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading2 />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Helmet>
        <title>{t("faculties.all")}</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <div className="title">{t("faculties.all")}</div>
            <Content.Body>
              {data.list?.map((item) => {
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
                  />
                );
              })}
            </Content.Body>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Faculties;
