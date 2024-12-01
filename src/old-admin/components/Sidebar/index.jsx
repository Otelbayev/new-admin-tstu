import React from "react";
import Accardion from "../Accardion";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { admin } from "../AdminSidebar";
import avatar from "../../assets/icons/avatar.png";

const Link = styled(NavLink)`
  background: transparent !important;
  box-shadow: none !important;
  &:hover {
    background: #ffffff1f !important;
  }
`;

const Sidebar = () => {
  const { i18n } = useTranslation();

  const sidebarItems = admin();
  const role = Cookies.get("role");
  const userData = JSON.parse(Cookies.get("_userDetails"));

  // const getName = (role) => {
  //   switch (role) {
  //     case "admin":
  //       return "Super Admin";
  //     case "teacher":
  //       return "O'qituvchi";
  //     case "studydepartment":
  //       return "O'quv bo'lim";
  //     case "headdepartment":
  //       return "Kafedra mudiri";
  //     case "virtualreception":
  //       return "Virtual qabulxona (Virtual)";
  //     case "moderatorcontent":
  //       return "Moderator content (Admin)";
  //   }
  // };

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary vh-100">
        <div style={{ boxShadow: "inset 0 0 1px #fff" }} className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                loading="lazy"
                src={
                  userData.person_?.img_?.url
                    ? `${import.meta.env.VITE_BASE_URL_IMG}${
                        userData.person_?.img_?.url
                      }`
                    : avatar
                }
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info" style={{ whiteSpace: "initial" }}>
              <NavLink to="profile" className="d-block">
                {userData.person_?.employee_type_?.title
                  ? userData.person_?.employee_type_?.title
                  : ""}
                - (
                {userData?.person_?.firstName
                  ? userData?.person_?.firstName
                  : ""}{" "}
                {userData?.person_?.lastName ? userData?.person_?.lastName : ""}{" "}
                {userData?.person_?.fathers_name
                  ? userData?.person_?.fathers_name
                  : ""}
                )
              </NavLink>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="home" className="nav-link">
                  <i className="nav-icon fas fa-university" />
                  <p>Asosiy</p>
                </NavLink>
              </li>
              {sidebarItems?.map((e) => {
                if (e?.roles.includes(role)) {
                  return e.path ? (
                    <li key={e.id} className="nav-item">
                      <NavLink to={e.path} className="nav-link">
                        <i className={e?.icon} />
                        <p>{e.title}</p>
                      </NavLink>
                    </li>
                  ) : (
                    <Accardion
                      key={e.id}
                      title={e.title}
                      icon={e.icon}
                      data={e.data}
                    />
                  );
                }
                return null;
              })}

              {/* Uni */}
              <li className="nav-item">
                <NavLink to="profile" className="nav-link">
                  <i className="nav-icon fas fa-user" />
                  <p>Profil</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to={`/${i18n.language}`} className="nav-link">
                  <i className="nav-icon fas fa-globe" />
                  <p>Saytga</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/${i18n.language}`}
                  className="nav-link"
                  onClick={() => Cookies.remove("_token")}
                >
                  <i className="nav-icon fas fa-power-off" />
                  <p>Chiqish</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
