import React, { useEffect, useState } from "react";
import { Title } from "../../Generics";
import { Container } from "./style";
import { useTranslation } from "react-i18next";
import Image from "../../Image";

const Faxriy = () => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyidpersondata/92`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetbyuzidpersondatatranslation/${92}?language_code=${
            i18n.language
          }`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [i18n.language]);

  return (
    <div>
      <div className="root-container">
        <div className="root-wrapper">
          <Title
            $type={"light"}
            title={t("honory.title")}
            button={t("alumni.btn")}
            to={"honory"}
          />
        </div>
      </div>

      <Container>
        <div className="root-container">
          <div className="root-wrapper" data-aos="fade-up">
            <div className="content">
              <Image
                src={`${import.meta.env.VITE_BASE_URL_IMG}${
                  data?.persons_?.img_?.url ||
                  data?.persons_translation_?.persons_?.img_?.url
                }`}
                alt=""
                className="content__img"
              />
              <div className="content__name">
                {data?.persons_?.firstName ||
                  data?.persons_translation_?.firstName}{" "}
                {data?.persons_?.lastName ||
                  data?.persons_translation_?.lastName}{" "}
                {data?.persons_?.fathers_name ||
                  data?.persons_translation_?.fathers_name}
              </div>
              <div className="content__sub">
                {data?.persons_?.employee_type_?.title ||
                  data?.persons_?.employee_type_translation?.title}
                {data?.degree}
              </div>
              {/* <div className="content__p">{data?.biography_json}</div> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faxriy;
