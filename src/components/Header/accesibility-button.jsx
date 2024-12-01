import React, { useEffect } from "react";
import eye from "../../assets/icons/eye.svg";

const AccessibilityButton = () => {
  useEffect(() => {
    if (window.isvek && window.isvek.Bvi) {
      new window.isvek.Bvi({
        target: ".bvi-open",
        theme: "white",
        lang: "ru-RU",
        bvi: {
          url: "/lib/bvi/bvi.min.css",
        },
      });
    }
  }, []);

  return (
    <a
      className="bvi-open"
      href="#"
      title="Ko‘zi ojizlar uchun versiya"
      style={{ textDecoration: "none" }}
    >
      <img src={eye} alt="" />
    </a>
  );
};

export default AccessibilityButton;
