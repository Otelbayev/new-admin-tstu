import React from "react";
import { Content, Icon } from "./style";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Yonalishlar = ({ data }) => {
  const naviagte = useNavigate();
  const { i18n } = useTranslation();

  return (
    <Content>
      {data?.length ? (
        data?.map((e) => (
          <Content.Wrap
            onClick={() =>
              naviagte(
                `/${i18n.language}/department/${
                  i18n.language === "uz" ? e?.id : e?.departament_?.id
                }`
              )
            }
            key={e.id}
          >
            <Icon />{" "}
            <Content.Item>
              {e.title} {e.description}
            </Content.Item>
          </Content.Wrap>
        ))
      ) : (
        <div>Ma'lumot mavjud emas!</div>
      )}
    </Content>
  );
};

export default Yonalishlar;
