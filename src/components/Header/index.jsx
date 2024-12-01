import React, { memo, useEffect, useRef, useState } from "react";
import logo1 from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/icons/logo4.png";
import logo5 from "../../assets/icons/qsstars2024.png";
import menu from "../../assets/icons/menu1.svg";
import search from "../../assets/icons/search.svg";
import { Menu as Antmenu } from "antd";
import { Lang } from "../Generics";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useTranslation } from "react-i18next";
import {
  Div,
  Left,
  Container,
  Wrapper,
  Menus,
  Menu,
  Icon,
  Right,
  Link,
  Search,
  Language,
  Mobile,
  Line,
  Desktop,
} from "./style";
import Image from "../Image";
import SearchComponent from "./search-box";
import { useSearchContext } from "../../context/SearchContext";
import { useMenuContext } from "../../context/MenuContext";
import AccessibilityButton from "./accesibility-button";

const Header = ({ uni }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isSearchOpen, setIsOpen: setIsSearchOpen } =
    useSearchContext();
  const { i18n, t } = useTranslation();
  const { loading, data, topMenu } = useMenuContext();
  const navigate = useNavigate();
  const inputRef = useRef();

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

  const items = [
    ...topMenu.map((item) => {
      return {
        key: item.id,
        label: !item?.link_ ? (
          item.title
        ) : (
          <NavLink to={`/${i18n.language}/${item?.link_}`}>
            {item.title}
          </NavLink>
        ),
        children:
          !item?.link_ &&
          data
            .filter((i) => i.parent_id === item.id)
            .map((i) => {
              return {
                key: i.id,
                label: i.high_menu ? (
                  i.title
                ) : (
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to={setNavigate(
                      i?.menu_type_?.title ||
                        i?.menu_type_translation_?.menu_type_?.title,
                      i?.blog_?.id ||
                        i?.blog_translation_?.blog_id ||
                        i?.departament_?.id ||
                        i?.departament_translation_?.departament_id ||
                        i?.page_?.id ||
                        i?.page_translation_?.page_id,
                      i?.link_
                    )}
                    target={
                      (i?.link_ && i?.menu_type_?.title === "Link") ||
                      i?.menu_type_?.title === "Link" ||
                      i?.menu_type_?.title === "Havola" ||
                      i?.menu_type_?.title === "Havola"
                        ? "_blank"
                        : "_self"
                    }
                  >
                    {i.title}
                  </NavLink>
                ),
                children: i.high_menu
                  ? data
                      .filter((f) => f.parent_id === i.id)
                      .map((h) => {
                        return {
                          key: h.id,
                          label: (
                            <NavLink
                              onClick={() => setIsOpen(false)}
                              to={setNavigate(
                                h?.menu_type_?.title ||
                                  h?.menu_type_translation_?.menu_type_?.title,
                                h?.blog_?.id ||
                                  h?.blog_translation_?.blog_id ||
                                  h?.departament_?.id ||
                                  h?.departament_translation_?.departament_id ||
                                  h?.page_?.id ||
                                  h?.page_translation_?.page_id,
                                h?.link_
                              )}
                              target={
                                (h?.link_ && h?.menu_type_?.title === "Link") ||
                                h?.menu_type_?.title === "Link" ||
                                h?.menu_type_?.title === "Havola" ||
                                h?.menu_type_?.title === "Havola"
                                  ? "_blank"
                                  : "_self"
                              }
                            >
                              {h.title}
                            </NavLink>
                          ),
                        };
                      })
                  : null,
              };
            }),
      };
    }),
    {
      key: "search",
      label: (
        <NavLink
          className="d-flex align-items-center justify-content-between px-3"
          onClick={() => {
            setIsOpen(false);
            setIsSearchOpen(true);
            inputRef?.current?.focus();
          }}
        >
          <span>Search</span> <img src={search} alt="" />
        </NavLink>
      ),
      children: null,
    },
  ];

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items);

  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Container $uni={uni}>
        <div className="root-container">
          <div className="root-wrapper">
            <Wrapper>
              <Menus>
                <Menu
                  loading="lazy"
                  src={menu}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setStateOpenKeys([]);
                    setIsSearchOpen(false);
                  }}
                />
              </Menus>
              <Left>
                <Link
                  to={`/${i18n.language}`}
                  onClick={() =>
                    navigate(window.location.pathname, { replace: true })
                  }
                >
                  <Image src={logo1} className={"logo-header"} alt="" />
                </Link>
                <Div>
                  <Link to={`/${i18n.language}`}>
                    <Image src={logo2} className={"logo-header"} alt="" />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://www.timeshighereducation.com/world-university-rankings/tashkent-state-transport-university"
                  >
                    <Image src={logo3} className={"logo-header"} />
                  </Link>
                  <Link target="_blank" to="https://www.4icu.org/uz/">
                    <Image src={logo4} $last="true" className={"logo-header"} />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://www.topuniversities.com/universities/tashkent-state-transport-university"
                  >
                    <Image src={logo5} $last="true" className={"logo-header"} />
                  </Link>
                </Div>
              </Left>
              <Right>
                <div className="item-desktop">
                  <Link to={`${i18n.language}/page/191`}>
                    {t("header.sym")}
                  </Link>
                  <Link
                    target="_blank"
                    to="https://student.tstu.uz/dashboard/login"
                  >
                    {t("header.talaba")}
                  </Link>
                  <Link
                    target="_blank"
                    to="https://hemis.tstu.uz/dashboard/login"
                  >
                    {t("header.xodim")}
                  </Link>
                  <Link to="https://elib.tstu.uz/" target="_blank">
                    {t("header.kutubxona")}
                  </Link>
                  <Link to="http://alumni.tstu.uz/">{t("header.alumni")}</Link>
                  <Search onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Icon loading="lazy" src={search} width={24} />
                    <div>{t("header.qidiruv")}</div>
                  </Search>
                  <AccessibilityButton />
                </div>
              </Right>
              <Language>
                <Lang width={80} />
              </Language>
            </Wrapper>
            <Desktop>
              {uni && <Line />}
              <Sidebar
                loading={loading}
                uni={uni}
                topData={topMenu}
                allData={data}
              />
            </Desktop>
          </div>
        </div>
        <SearchComponent inputRef={inputRef} />
      </Container>
      <Mobile $isopen={isOpen.toString()}>
        <Antmenu
          mode="inline"
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          theme="dark"
          items={items}
        />
      </Mobile>
    </div>
  );
};

export default memo(Header);
