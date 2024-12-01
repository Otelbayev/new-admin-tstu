import React from "react";
import { Dekan } from "./style";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dekans = ({ data }) => {
  const { i18n, t } = useTranslation();

  const naviagte = useNavigate();
  return (
    <Dekan>
      <Dekan.Left data-aos="fade-right">
        <Dekan.Img
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL_IMG}${
            data?.persons_?.img_?.url ||
            data?.persons_translation_?.persons_?.img_?.url
          }`}
        />
      </Dekan.Left>
      <Dekan.Right data-aos="fade-left">
        <Dekan.Name>
          {data?.persons_?.firstName || data?.persons_translation_?.firstName}{" "}
          {data?.persons_?.lastName || data?.persons_translation_?.lastName}{" "}
          {data?.persons_?.fathers_name ||
            data?.persons_translation_?.fathers_name}
        </Dekan.Name>
        <Dekan.Contact>
          <Dekan.User />
          <div>
            {data?.degree} {data?.scientific_title}
          </div>
        </Dekan.Contact>
        {data?.phone_number1 && (
          <Dekan.Contact>
            <Dekan.Phone />
            <div>{data?.phone_number1}</div>
          </Dekan.Contact>
        )}
        {data?.persons_?.email && (
          <Dekan.Contact>
            <Dekan.Email />
            <div>{data?.persons_?.email}</div>
          </Dekan.Contact>
        )}
        <div dangerouslySetInnerHTML={{ __html: data?.experience_json }} />
        {/* <Dekan.Ul>
          {data?.experience_json?.split(";").map((e, index) => (
            <Dekan.Li key={index}>{e}.</Dekan.Li>
          ))}{" "}
        </Dekan.Ul> */}

        <Dekan.Btn
          type="primary"
          onClick={() =>
            naviagte(
              `/${i18n.language}/employee/${
                i18n.language === "uz" ? data?.id : data?.persons_data_id
              }`
            )
          }
        >
          {t("Bdirections.btn")}
        </Dekan.Btn>
      </Dekan.Right>
    </Dekan>
  );
};

export default Dekans;
