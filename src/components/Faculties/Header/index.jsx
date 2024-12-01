import React, { useState } from "react";
import logo1 from "../../../assets/logo.png";
import { Container, Content, Link, Search } from "./style";
import { Lang } from "../../Generics";
import { NavLink } from "react-router-dom";
import menu from "../../../assets/icons/menu1.svg";
import { SearchBox } from "../../Header/style";
import { useTranslation } from "react-i18next";
import { useHandleScroll } from "../../../hooks/useHandleScroll";

const Header = ({ links }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <Container className="root-container">
        <Content className="root-wrapper" $isOpen={isOpen}>
          <div className="menu" onClick={() => setIsOpen(true)}>
            <img loading="lazy" src={menu} alt="" />
          </div>
          <NavLink to={`/${i18n.language}`}>
            <img loading="lazy" style={{ height: "40px" }} src={logo1} alt="" />
          </NavLink>
          <div className="right">
            <ul className="ul">
              {links?.map((e, index) =>
                index === 0 ? (
                  <li className="first" key={index}>
                    <Link onClick={() => useHandleScroll(e?.refs)}>
                      {e?.title}
                    </Link>
                    <i
                      className="fa fa-x"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    ></i>
                  </li>
                ) : (
                  <li key={index}>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        useHandleScroll(e?.refs);
                      }}
                    >
                      {e?.title}
                    </Link>
                  </li>
                )
              )}
              <li
                className="qidirish"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Link>
                  {t("header.qidiruv")} <Search />
                </Link>
              </li>
              <li className="search">
                <form
                  className="row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                >
                  <input
                    type="text"
                    className="col-9"
                    placeholder={`${t("header.qidiruv")}...`}
                  />
                  <button className="col-3 btn btn-secondary">
                    {t("header.qidiruv")}
                  </button>
                </form>
              </li>
            </ul>
            <div className="lang">
              <Lang />
            </div>
            <div className="bg" onClick={(e) => setIsOpen(false)}></div>
          </div>
        </Content>
      </Container>
      <SearchBox $isopen={isSearchOpen.toString()} $zIndex={10}>
        <div className="root-container">
          <div className="root-wrapper">
            <input type="text" placeholder={`${t("header.qidiruv")}...`} />
          </div>
        </div>
      </SearchBox>
    </div>
  );
};

export default Header;
