import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { FcHome, FcPortraitMode, FcTemplate, FcUpLeft } from "react-icons/fc";
import { admin } from "../AdminSidebar";
import avatar from "../../assets/icons/avatar.png";
import Sider from "antd/es/layout/Sider";
import { Image, Menu } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AntdSidebar = () => {
  const sidebarItems = admin();
  const role = Cookies.get("role");
  const { i18n } = useTranslation();
  const userData = JSON.parse(Cookies.get("_userDetails"));

  const [isOpen, setIsOpen] = useState(false);

  const width = window.innerWidth;

  const handleToggle = () => {
    if (width < 768) {
      setIsOpen(true);
    }
  };

  const items = useMemo(() => {
    return sidebarItems.map((item) => {
      if (item.roles.includes(role) || item.roles.includes("*")) {
        return {
          label: item.children ? (
            <div to={item.key}>{item.label}</div>
          ) : (
            <NavLink onClick={handleToggle} to={item.key}>
              {item.label}
            </NavLink>
          ),
          icon: item.icon,
          key: item.key,
          children: item.children?.map((child) => ({
            label: (
              <NavLink onClick={handleToggle} to={child.key}>
                {child.label}
              </NavLink>
            ),
            key: child.key,
            icon: child.icon,
          })),
        };
      }
    });
  }, [sidebarItems, role]);

  const [path, setPath] = useState(window.location.pathname);
  const onMenu = (e) => {
    setPath(e.key);
  };

  useEffect(() => {
    setPath(window.location.pathname.split("admin/")[1]);
  }, []);

  return (
    <Container>
      {!isOpen && <div className="abs-bg" onClick={() => setIsOpen(true)} />}
      <Sider
        className="sider"
        breakpoint="md"
        style={{
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        collapsedWidth="0"
        width={"260px"}
        onCollapse={(collapsed) => {
          setIsOpen(collapsed);
        }}
        collapsed={isOpen}
      >
        <div className="menu-sidebar">
          <div className="user">
            <div className="user__avatar">
              <Image
                loading="lazy"
                src={
                  userData.person_?.img_?.url
                    ? `${import.meta.env.VITE_BASE_URL_IMG}${
                        userData.person_?.img_?.url
                      }`
                    : avatar
                }
                alt="User Image"
                className="user__avatar--img"
              />
              <span className="user__avatar--role">
                {userData.person_?.employee_type_?.title}{" "}
              </span>
            </div>
            <div className="user__name">
              <span>
                {`${userData.person_?.lastName
                  ?.split("")[0]
                  ?.toUpperCase()}${userData.person_?.lastName
                  ?.slice(1)
                  ?.toLowerCase()}`}
              </span>
              <span>
                {`  ${userData.person_?.firstName
                  ?.split("")[0]
                  ?.toUpperCase()}${userData.person_?.firstName
                  ?.slice(1)
                  ?.toLowerCase()}  `}
              </span>
              <span>{`${userData.person_?.fathers_name
                ?.split("")[0]
                ?.toUpperCase()}${userData.person_?.fathers_name
                ?.slice(1)
                ?.toLowerCase()}`}</span>
            </div>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            className="sidebar-menu"
            onClick={onMenu}
            selectedKeys={[path]}
            items={[
              {
                label: (
                  <NavLink
                    onClick={handleToggle}
                    to={`/${i18n.language}/admin/home`}
                  >
                    Asosiy
                  </NavLink>
                ),
                key: "home",
                icon: <FcHome size={"25px"} />,
              },
              ...items,
              {
                label: (
                  <NavLink onClick={handleToggle} to={"profile"}>
                    Profil
                  </NavLink>
                ),
                key: "profile",
                icon: <FcPortraitMode size={"25px"} />,
              },
              {
                label: <NavLink to={`/${i18n.language}`}>Saytga</NavLink>,
                key: "5",
                icon: <FcTemplate size={"25px"} />,
              },
              {
                label: (
                  <NavLink
                    to={`/${i18n.language}`}
                    onClick={() => Cookies.remove("_token")}
                  >
                    Chiqish
                  </NavLink>
                ),
                key: "4",
                icon: <FcUpLeft size={"25px"} />,
              },
            ]}
          />
        </div>
      </Sider>
    </Container>
  );
};

export default AntdSidebar;

const Container = styled.div`
  .user {
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    &__avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      &--img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
      &--role {
        color: #d3d3d3;
        font-size: 16px;
      }
    }
    &__name {
      font-weight: bold;
      text-align: center;
      color: #d3d3d3;
      font-size: 16px;
      padding-top: 10px;
    }
  }
  .abs-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }
  .sidebar-menu {
    padding: 10px 0;
  }
  .menu-sidebar {
    height: 100vh;
    overflow-y: auto;
  }
  @media screen and (max-width: 768px) {
    .sider {
      position: fixed;
      z-index: 99;
    }
    .abs-bg {
      display: block;
    }
  }
`;
