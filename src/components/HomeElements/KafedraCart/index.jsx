import React from "react";
import { Content } from "./style";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Image from "../../Image";

const KafedraCart = ({ prop, dataAos, $slider, onClick, arrow, fac }) => {
  const { t } = useTranslation();

  return (
    <Content data-aos={dataAos} onClick={onClick} $slider={$slider}>
      <Image
        src={`${import.meta.env.VITE_BASE_URL_IMG}${
          prop?.img_?.url || prop?.img_translation_?.url
        }`}
        alt=""
        className="img"
      />
      <div className="flex-name">
        <NavLink className="name">
          {prop?.title?.split(" ")?.length <= 4
            ? prop.title
            : prop?.title?.split(" ")?.slice(0, 3)?.join(" ") + "..."}
          {fac ? t("faculties.in") : ""}
        </NavLink>
      </div>
    </Content>
  );
};

export default KafedraCart;
