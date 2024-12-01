import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { Lang } from "../../components/Generics";
import noimg from "../../assets/images/no.jpg";
import Form from "./form";
import Footer from "./footer";
import About from "./about";
import Skills from "./skills";
import Education from "./education";
import { Helmet } from "react-helmet";
import { useTeachersContext } from "../../context/TeachersContext";

const EmployeeID = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const { teachers } = useTeachersContext();

  const cachedData = useMemo(() => {
    if (i18n.language === "uz" && teachers?.length) {
      return teachers.find((teacher) => teacher.id === parseInt(id));
    } else if (i18n.language !== "uz" && teachers?.length) {
      return teachers.find(
        (teacher) => teacher.persons_data_id === parseInt(id)
      );
    }
  });

  const getData = () => {
    if (cachedData) {
      setData(cachedData);
      return;
    }
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyidpersondata/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyuzidpersondatatranslation/${id}?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>
          {data?.persons_?.firstName ||
            data?.persons_translation_?.firstName ||
            ""}{" "}
          {data?.persons_?.lastName ||
            data?.persons_translation_?.lastName ||
            ""}{" "}
          {data?.persons_?.fathers_name ||
            data?.persons_translation_?.fathers_name ||
            ""}
        </title>
        <meta
          name="description"
          content={`${
            data?.persons_?.employee_type_?.title ||
            data?.persons_translation_?.employee_type_translation_?.title ||
            ""
          }  ${data?.degree || ""} ${data?.phone_number1 || ""} ${
            data?.persons_?.email ||
            data?.persons_translation_?.persons_?.email ||
            ""
          }  ${data?.address || ""}`}
        />
      </Helmet>
      <div className="body">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar-text d-flex flex-column h-100 justify-content-center text-center">
              <img
                loading="lazy"
                className="w-100 img-fluid mb-4"
                src={
                  data?.persons_?.img_?.url ||
                  data?.persons_translation_?.persons_?.img_?.url
                    ? `${import.meta.env.VITE_BASE_URL_IMG}${
                        data?.persons_?.img_?.url ||
                        data?.persons_translation_?.persons_?.img_?.url
                      }`
                    : noimg
                }
                alt="Image"
              />
              <h2 className="mt-2">
                {" "}
                {data?.persons_?.firstName ||
                  data?.persons_translation_?.firstName}{" "}
                {data?.persons_?.lastName ||
                  data?.persons_translation_?.lastName}{" "}
                {data?.persons_?.fathers_name ||
                  data?.persons_translation_?.fathers_name}
              </h2>
              <div className="mb-4">
                <div>
                  {data?.persons_?.employee_type_?.title ||
                    data?.persons_translation_?.employee_type_translation_
                      ?.title}{" "}
                  {data?.degree} {data?.scientific_title}
                </div>
              </div>
              <div className="mb-4">
                <h4>
                  {data?.document110Score > 0
                    ? `${data?.document110Score} ball`
                    : ""}
                </h4>
              </div>
              <div className="d-flex justify-content-center mt-auto mb-3">
                {/* <a className="mx-2" href title="Telegram">
                <i className="fab fa-telegram" />
              </a>
              <a className="mx-2" href title="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="mx-2" href title="WEB SITE">
                <i className="fab fa-chrome" />
              </a>
              <a className="mx-2" href>
                <i className="fab fa-instagram" title="Instagram" />
              </a>
              <a className="mx-2" href>
                <i className="fab fa-youtube" title="Youtube" />
              </a> */}
              </div>
              <div className="d-flex align-items-end justify-content-between">
                <Lang mode="light" />
              </div>
            </div>
            <div className="sidebar-icon d-flex flex-column h-100 justify-content-center text-right">
              <i className="fas fa-2x fa-angle-double-right text-primary" />
            </div>
          </div>
          <div className="content">
            <About data={data} t={t} />
            <Skills data={data} t={t} />
            <Education data={data} t={t} />
          </div>
          <div className="content">
            <div className="container bg-white pt-5 pb-3">
              <div className="row px-3">
                <div className="col-12">
                  <h2 className="title position-relative pb-2 mb-4">
                    {t("employee.ilm")}
                  </h2>
                </div>
                <div
                  className="col-12"
                  dangerouslySetInnerHTML={{
                    __html: data?.scientific_activity_json
                      ? data?.scientific_activity_json
                      : "<p class='no-data'>Ma'lumotlar yo'q</p>",
                  }}
                />
              </div>
            </div>
            <div className="container bg-white pt-5 pb-3">
              <div className="row px-3">
                <div className="col-12">
                  <h2 className="title position-relative pb-2 mb-4">
                    {t("employee.portfolio")}
                  </h2>
                </div>
                <div
                  className="col-12"
                  dangerouslySetInnerHTML={{
                    __html: data?.portfolio_json
                      ? data?.portfolio_json
                      : "<p class='no-data'>Ma'lumotlar yo'q</p>",
                  }}
                />
              </div>
            </div>
            <div className="container bg-white py-5">
              <div className="row px-3">
                <div className="col-12">
                  <h2 className="title position-relative pb-2 mb-4">Blog</h2>
                </div>
                <div
                  className="col-12"
                  dangerouslySetInnerHTML={{
                    __html: data?.blog_json
                      ? data?.blog_json
                      : "<p class='no-data'>Ma'lumotlar yo'q</p>",
                  }}
                />
              </div>
            </div>
            {/* <Form t={t} id={id} /> */}
            <Footer t={t} />
          </div>
        </div>
        <a href="#" className="back-to-top">
          <i className="fa fa-angle-double-up" />
        </a>
      </div>
    </div>
  );
};

export default EmployeeID;
