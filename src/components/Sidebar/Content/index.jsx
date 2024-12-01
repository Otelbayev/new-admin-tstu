import React, { useMemo } from "react";
import { All, Container } from "./style";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Content = ({ hover, setHover, data, id, topData, allData }) => {
  const { i18n } = useTranslation();

  // const first = topData?.find((e) => e?.id === id);

  const first = useMemo(() => {
    return topData?.find((e) => e?.id === id);
  }, [id]);

  const res = useMemo(() => {
    return data?.filter((e) => e?.high_menu);
  }, [id]);
  const res1 = useMemo(() => {
    return data?.filter((e) => !e.high_menu);
  }, [id]);

  const setNavigate = (type, id, link) => {
    switch (type) {
      case "Link":
        return `${link}`;
      case "Blog":
        return `/${i18n.language}/blog/${id}`;
      case "Page":
        return id
          ? `/${i18n.language}/page/${id}`
          : `/${i18n.language}/${link}`;
      case "Faculty":
        return id
          ? `/${i18n.language}/department/${id}`
          : `/${i18n.language}/faculty`;
      case "Kafedra":
        return id
          ? `/${i18n.language}/department/${id}`
          : `/${i18n.language}/kafedra`;
      case "Department":
        return `/${i18n.language}/department/${id}`;

      case "Havola":
        return `${link}`;
      case "Blog":
        return `/${i18n.language}/blog/${id}`;
      case "Sahifa":
        return id
          ? `/${i18n.language}/page/${id}`
          : `/${i18n.language}/${link}`;
      case "Fakultet":
        return id
          ? `/${i18n.language}/department/${id}`
          : `/${i18n.language}/faculty`;
      case "Bo'lim":
        return `/${i18n.language}/department/${id}`;
      default:
        return "/";
    }
  };
  if (id === "alldata") {
    return (
      <All
        $hover={hover}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {topData
          ?.sort((a, b) => a.position - b.position)
          ?.map((item, index) => (
            <div className="alllinks" key={index}>
              <div className="alllinks__title">{item.title}</div>

              {allData
                ?.filter((e) => e.parent_id === item?.id)
                ?.map((e) =>
                  e?.high_menu ? (
                    <div key={e.id}>
                      <div className="subtitle">{e.title}</div>
                      {allData
                        .filter((b) => b.parent_id === e?.id)
                        ?.map((e) => (
                          <div key={e.id} className="sublink">
                            <NavLink
                              onClick={() => setHover(false)}
                              to={setNavigate(
                                e?.menu_type_?.title ||
                                  e?.menu_type_translation_?.menu_type_?.title,
                                e?.blog_?.id ||
                                  e?.blog_translation_?.blog_id ||
                                  e?.departament_?.id ||
                                  e?.departament_translation_?.departament_id ||
                                  e?.page_?.id ||
                                  e?.page_translation_?.page_id,
                                e?.link_
                              )}
                              target={
                                (e?.link_ &&
                                  e?.menu_type_?.title === "Havola") ||
                                e?.menu_type_translation_?.title === "Ссылка" ||
                                e?.menu_type_translation_?.title === "Link"
                                  ? "_blank"
                                  : "_self"
                              }
                            >
                              {e.title}
                            </NavLink>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div key={e.id} className="sublink">
                      <NavLink
                        onClick={() => setHover(false)}
                        to={setNavigate(
                          e?.menu_type_?.title ||
                            e?.menu_type_translation_?.menu_type_?.title,
                          e?.blog_?.id ||
                            e?.blog_translation_?.blog_id ||
                            e?.departament_?.id ||
                            e?.departament_translation_?.departament_id ||
                            e?.page_?.id ||
                            e?.page_translation_?.page_id,
                          e?.link_
                        )}
                        target={
                          (e?.link_ && e?.menu_type_?.title === "Havola") ||
                          e?.menu_type_translation_?.title === "Ссылка" ||
                          e?.menu_type_translation_?.title === "Link"
                            ? "_blank"
                            : "_self"
                        }
                      >
                        {e.title}
                      </NavLink>
                    </div>
                  )
                )}
            </div>
          ))}
      </All>
    );
  }

  return (
    <Container
      $hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {first?.title && (
        <div className="left">
          <div className="left__top">
            <img
              src={`${import.meta.env.VITE_BASE_URL_IMG}${first?.icon_?.url}`}
              alt=""
              className="left__top__icon"
            />
            <div className="left__top__title">{first?.title}</div>
          </div>
          <div className="left__desc">{first?.description}</div>
        </div>
      )}
      <div className="right">
        {res?.length ? (
          res
            .sort((a, b) => a?.high_menu - b?.high_menu)
            .map((e) => {
              return (
                <div key={e.id} className="right__item">
                  <div className="right__title">{e.title}</div>
                  {res1
                    ?.filter((item) => item?.parent_id === e?.id)
                    ?.sort((a, b) => a?.position - b?.position)
                    ?.map((item) => (
                      <div key={item.id} className={"right__link"}>
                        <NavLink
                          onClick={() => setHover(false)}
                          to={setNavigate(
                            item?.menu_type_?.title ||
                              item?.menu_type_translation_?.menu_type_?.title,
                            item?.blog_?.id ||
                              item?.blog_translation_?.blog_id ||
                              item?.departament_?.id ||
                              item?.departament_translation_?.departament_id ||
                              item?.page_?.id ||
                              item?.page_translation_?.page_id,
                            item?.link_
                          )}
                          target={
                            (item?.link_ &&
                              item?.menu_type_?.title === "Havola") ||
                            item?.menu_type_translation_?.title === "Ссылка" ||
                            item?.menu_type_translation_?.title === "Link"
                              ? "_blank"
                              : "_self"
                          }
                        >
                          {item?.title}
                        </NavLink>
                      </div>
                    ))}
                </div>
              );
            })
        ) : (
          <div className="right__item">
            {res1
              ?.filter((item) => item?.parent_id === id || id === "alldata")
              ?.sort((a, b) => a?.position - b?.position)
              ?.map((item) => (
                <div key={item.id} className={"right__link"}>
                  <NavLink
                    onClick={() => setHover(false)}
                    to={setNavigate(
                      item?.menu_type_?.title ||
                        item?.menu_type_translation_?.menu_type_?.title,
                      item?.blog_?.id ||
                        item?.blog_translation_?.blog_id ||
                        item?.departament_?.id ||
                        item?.departament_translation_?.departament_id ||
                        item?.page_?.id ||
                        item?.page_translation_?.page_id,
                      item?.link_
                    )}
                    target={
                      (item?.link_ && item?.menu_type_?.title === "Havola") ||
                      item?.menu_type_translation_?.title === "Ссылка" ||
                      item?.menu_type_translation_?.title === "Link"
                        ? "_blank"
                        : "_self"
                    }
                  >
                    {item?.title}
                  </NavLink>
                </div>
              ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Content;
