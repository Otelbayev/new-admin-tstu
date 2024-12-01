import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Accardion = ({ title, data, icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className={open ? "nav-item menu-open" : "nav-item"}>
      <a onClick={() => setOpen(!open)} href="#" className="nav-link">
        <i className={icon} />
        <p className="px-2">
          {title}
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        {data?.length
          ? data.map((e) => (
              <li
                className="nav-item"
                style={{ marginLeft: "10px" }}
                key={e.id}
              >
                <NavLink
                  to={
                    e?.path ||
                    `${e.name || "blog"}/${e.title?.toLowerCase() || e.label}`
                  }
                  className="nav-link"
                >
                  <i className="far fa-circle nav-icon"></i>
                  <p>{e.title || e.label}</p>
                </NavLink>
              </li>
            ))
          : null}
      </ul>
    </li>
  );
};

export default Accardion;
