import { Select } from "antd";
import { Container } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext/";

const Lang = ({ mode, width }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const { options } = useLanguageContext();

  const code = options.map((e) => e?.code);

  let datas = options.map((e) => {
    return {
      label: e.title_short,
      value: e.code,
    };
  });

  const url = window.location.href;
  const urlObject = new URL(url);

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
    if (window.location.pathname === "/") {
      navigate(`/${value}${urlObject?.search ? urlObject?.search : ""}`, {
        replace: true,
      });
    } else {
      const regex = new RegExp(`^/(${code.join("|")})`);
      const newPath =
        location.pathname.replace(regex, `/${value}`) +
        (urlObject?.search ? urlObject?.search : "");
      navigate(newPath, { replace: true });
    }
  };

  return (
    <Container $mode={mode}>
      <Select
        style={{ width: "75px" }}
        value={i18n.language}
        onChange={changeLanguage}
        options={datas}
        className="select"
      />
    </Container>
  );
};

export default Lang;
