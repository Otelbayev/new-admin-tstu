import React from "react";
import { Contianer, Icons } from "./style";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Image from "../Image";

const IlmiyMarkazCart = ({ $border, to, item, dataAos, style }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Contianer
      $border={$border}
      data-aos={dataAos}
      onClick={() => navigate(`/${i18n.language}/${to}`)}
      style={style}
    >
      <div className="item">
        <Image
          src={`${import.meta.env.VITE_BASE_URL_IMG}${item?.img_?.url}`}
          alt=""
          className="item__img"
        />
        <div className="bottom-back">
          <div className="item__title">
            {item?.title || "Temir yo‘l transporti ilmiy tadqiqot markazi"}
          </div>
          <div className="item__p" id="truncate">
            {item?.description?.split(" ")?.slice(0, 10)?.join(" ")}...{" "}
          </div>
        </div>
        <div className="item__button">{t("centers.kop")}</div>
      </div>
    </Contianer>
  );
};

export default IlmiyMarkazCart;
