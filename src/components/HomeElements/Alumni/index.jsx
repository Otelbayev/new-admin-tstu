import React, { useEffect, useState } from "react";
import { Title } from "../../Generics";
import { Ramatov } from "./style";
import Slider from "react-slick";
import RamatovSlider from "../RamatovSlider";
import { useTranslation } from "react-i18next";
import Image from "../../Image";

const ramatovSetting = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ramatovSetting1 = {
  dots: false,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Alumni = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondata?employee_type=Faxriy%20bitiruvchi`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondatatranslation?language_code=${
            i18n.language
          }&employee_type=Faxriy%20bitiruvchi`
    )
      .then((e) => e.json())
      .then((e) => setData(e));
  }, [i18n.language]);

  return (
    <div>
      <div className="root-container">
        <div className="root-wrapper mt-4 mb-4">
          <Title
            title={t("alumni.title")}
            button={t("alumni.btn")}
            subtitle={t("alumni.desc")}
            link="http://alumni.tstu.uz"
            $type={"light"}
          />
        </div>
      </div>

      <Ramatov>
        <div className="root-container">
          <div className="root-wrapper" data-aos="fade-up">
            <div className="alumni">
              <Slider {...ramatovSetting1}>
                {data?.map((e) => {
                  return (
                    <div key={e?.id}>
                      <div className="content">
                        <Image
                          src={`${import.meta.env.VITE_BASE_URL_IMG}${
                            e?.persons_?.img_?.url ||
                            e?.persons_translation_?.persons_?.img_?.url
                          }`}
                          alt=""
                          className="content__img"
                        />
                        <div className="content__name">
                          {e?.persons_?.firstName} {e?.persons_?.lastName}{" "}
                          {e?.persons_?.fathers_name}
                        </div>
                        <div className="content__sub">
                          {e?.degree ||
                            "Oʻzbekiston Bosh vazirining birinchi oʻrinbosari"}
                        </div>
                        <div
                          className="content__p"
                          dangerouslySetInnerHTML={{
                            __html: e?.biography_json,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <Slider className="slider" {...ramatovSetting}>
          {data?.map((e) => (
            <RamatovSlider key={e.id} prop={e} />
          ))}
        </Slider>
      </Ramatov>
    </div>
  );
};

export default Alumni;
