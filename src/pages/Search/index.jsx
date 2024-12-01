import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useSearchContext } from "./../../context/SearchContext/index";
import { useTranslation } from "react-i18next";
import useAxios from "./../../hooks/useAxios";
import Loading2 from "../../components/Loading2";
import { Result } from "antd";
import { NavLink } from "react-router-dom";
import debounce from "lodash.debounce";
import { Helmet } from "react-helmet";

const Search = () => {
  const { value, setIsOpen } = useSearchContext();
  const { i18n, t } = useTranslation();
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const { error, sendRequest } = useAxios();

  const getData = useCallback(
    debounce(async (value) => {
      if (!value.trim()) return;

      try {
        startTransition(async () => {
          const url =
            i18n.language === "uz"
              ? `${
                  import.meta.env.VITE_BASE_URL_API
                }/Search/search?search_text=${value}`
              : `${import.meta.env.VITE_BASE_URL_API}/Search/search/${
                  i18n.language
                }?search_text=${value}`;

          const res = await sendRequest({
            method: "get",
            url,
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
            },
          });

          if (res.status === 200) {
            setData(res.data);
          } else {
            setData([]);
          }
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }, 500),
    [i18n.language] // Adding i18n.language as a dependency
  );

  useEffect(() => {
    return () => {
      getData.cancel(); // Cancel any pending debounce calls
    };
  }, [getData]);

  const getTitle = (type, lang) => {
    const titles = {
      Blogs: {
        uz: "Bloglar",
        en: "Blogs",
        ru: "Блоги",
      },
      Pages: {
        uz: "Sahifalar",
        en: "Pages",
        ru: "Страницы",
      },
      Employees: {
        uz: "Xodimlar",
        en: "Employees",
        ru: "Сотрудники",
      },
      Departaments: {
        uz: "Bo'limlar",
        en: "Departments",
        ru: "Отделы",
      },
    };

    return titles[type]?.[lang] || type;
  };

  useEffect(() => {
    getData(value);
  }, [value, i18n.language, getData]);

  if (isPending) {
    return (
      <div className="mt-5">
        <Loading2 />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          style={{
            width: "100%",
          }}
        />
      </div>
    );
  }

  const toDepartmen = (type, id) => {
    switch (type) {
      case "Fakultet":
        return `/${i18n.language}/faculty/${id}`;
      case "Kafedra":
        return `/${i18n.language}/kafedra/${id}`;
      default:
        return `/${i18n.language}/department/${id}`;
    }
  };

  const toNavigate = (
    type,
    id,
    blog_id,
    persons_data_id,
    page_id,
    department_type,
    departament_id
  ) => {
    if (type === "Bloglar" || type === "Blogs") {
      return (
        <NavLink
          to={`/${i18n.language}/blog/${i18n.language === "uz" ? id : blog_id}`}
          onClick={() => setIsOpen(false)}
        >
          {t("Bdirections.btn")}
        </NavLink>
      );
    } else if (type === "Departaments" || type === "Bo'limlar") {
      return (
        <NavLink
          to={toDepartmen(
            department_type,
            i18n.language === "uz" ? id : departament_id
          )}
          onClick={() => setIsOpen(false)}
        >
          {t("Bdirections.btn")}
        </NavLink>
      );
    } else if (type === "Employees" || type === "Xodimlar") {
      return (
        <NavLink
          to={`/${i18n.language}/employee/${
            i18n.language === "uz" ? id : persons_data_id
          }`}
          onClick={() => setIsOpen(false)}
        >
          {t("Bdirections.btn")}
        </NavLink>
      );
    } else if (type === "Pages" || type === "Pagelar") {
      return (
        <NavLink
          to={`/${i18n.language}/page/${i18n.language === "uz" ? id : page_id}`}
          onClick={() => setIsOpen(false)}
        >
          {t("Bdirections.btn")}
        </NavLink>
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>{t("Qidiruv...")}</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper mt-3">
          <div className="mt-5">
            {data.length ? (
              data.map((e, index) => {
                return (
                  <div key={index}>
                    {e?.length !== 0 ? (
                      <div className="title">
                        {getTitle(e?.type, i18n.language)}
                      </div>
                    ) : (
                      ""
                    )}
                    {e?.query_list?.map((item) => (
                      <div
                        key={item?.id}
                        className="mx-3 d-flex justify-content-between border border-left-0 border-right-0 p-2"
                      >
                        <div>
                          {item?.title
                            ? item?.title
                            : `${
                                item?.persons_?.fathers_name ||
                                item?.persons_translation_?.fathers_name
                              } ${
                                item?.persons_?.firstName ||
                                item?.persons_translation_?.firstName
                              } ${
                                item?.persons_?.lastName ||
                                item?.persons_translation_?.lastName
                              }`}
                        </div>
                        {toNavigate(
                          e.type,
                          item?.id,
                          item?.blog_id,
                          item?.persons_data_id,
                          item?.page_id,
                          item?.departament_type_?.type ||
                            item?.departament_type_translation_
                              ?.departament_type_?.type,
                          item?.departament_id
                        )}
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <div className="mt-5">
                <Loading2 />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
