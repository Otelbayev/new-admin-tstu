import React, { useEffect } from "react";
import { Container } from "./style";
import { Title } from "../../Generics";
import Slider from "react-slick";
import KafedraCart from "../KafedraCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loading2 from "../../Loading2";
import { useBlogsContext } from "../../../context/BlogsContext";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
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

const Talim = () => {
  const { t, i18n } = useTranslation();

  const { talims, setTalims } = useBlogsContext();

  const fetchData = async (title, favo, pageNum) => {
    const url =
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblog?blog_category=${title}&favorite=${favo}&pageNum=${pageNum}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblogtranslation?language_code=${
            i18n.language
          }&blog_category_uz=${title}&favorite=${favo}&pageNum=${pageNum}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      if (
        talims.list?.length === 0 ||
        talims?.language_code !== i18n.language
      ) {
        const d1 = await fetchData("Ta‘lim", true, 1);
        setTalims(d1);
      }
    };
    fetchAllData();
  }, [i18n.language]);

  return (
    <Container className="root-container">
      <div className="root-wrapper">
        <Title
          title={t("talim.title")}
          subtitle={t("talim.desc")}
          button={t("talim.btn")}
          $type={"light"}
          to={"education"}
        >
          <div data-aos="fade-up">
            <Slider className="slider" {...settings}>
              {talims?.list
                ?.sort((a, b) => b?.id - a?.id)
                ?.map((e) => (
                  <div className="slider__item" key={e.id}>
                    <KafedraCart
                      onClick={() =>
                        navigate(
                          `/${i18n.language}/blog/${
                            i18n.language === "uz" ? e?.id : e?.blog_id
                          }`
                        )
                      }
                      $slider={"true"}
                      prop={e}
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </Title>
      </div>
    </Container>
  );
};

export default Talim;
