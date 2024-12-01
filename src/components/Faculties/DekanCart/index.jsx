import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Content } from "./style";
import { useTranslation } from "react-i18next";
import noimg from "../../../assets/images/no.jpg";
import { Rate } from "antd";
import { useRate } from "../../../hooks/useRate";
const DekanCart = ({ data, rating }) => {
  const naviagte = useNavigate();
  const { i18n } = useTranslation();

  return (
    <Content data-aos="zoom-in">
      <Content.Img
        onClick={() =>
          naviagte(
            `/${i18n.language}/employee/${
              i18n.language === "uz" ? data?.id : data?.persons_data_id
            }`
          )
        }
        loading="lazy"
        src={
          data?.persons_?.img_?.url ||
          data?.persons_translation_?.persons_?.img_?.url
            ? `${import.meta.env.VITE_BASE_URL_IMG}${
                data?.persons_?.img_?.url ||
                data?.persons_translation_?.persons_?.img_?.url
              }`
            : noimg
        }
      />
      <Content.Name
        onClick={() => naviagte(`/${i18n.language}/employee/${data?.id}`)}
      >
        {data?.persons_?.firstName || data?.persons_translation_?.firstName}{" "}
        {data?.persons_?.lastName || data?.persons_translation_?.lastName}{" "}
        {data?.persons_?.fathers_name ||
          data?.persons_translation_?.fathers_name}
      </Content.Name>
      {rating && (
        <Rate disabled defaultValue={useRate(data.document110Score || 0)} />
      )}

      {data?.document110Score > 0 ? (
        <h5>{data?.document110Score} ball </h5>
      ) : (
        ""
      )}
      <Content.Position>
        {data.persons_?.employee_type_?.title ||
          data.persons_translation_?.employee_type_translation_?.title}
      </Content.Position>
      <Content.Media>
        <NavLink>
          <Content.Facebook />
        </NavLink>
        <NavLink>
          <Content.Whatsup />
        </NavLink>
        <NavLink>
          <Content.Instagram />
        </NavLink>
      </Content.Media>
    </Content>
  );
};

export default DekanCart;
