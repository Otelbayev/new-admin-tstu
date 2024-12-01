import React, { useEffect, useMemo } from "react";
import { Container, Layout } from "./style";
import { Title } from "../../Generics";
import LargeBanner from "../LargeBanner";
import filterSt from "../../../assets/images/filterSt.png";
import jasco from "../../../assets/images/dalban.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBlogsContext } from "../../../context/BlogsContext";

const Talaba = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { talaba, setTalaba } = useBlogsContext();

  const fetchData = async (title, favo, pageNum, queryNum) => {
    const url =
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblog?blog_category=${title}&favorite=${favo}&pageNum=${pageNum}&queryNum=${queryNum}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/blogcontroller/sitegetallblogtranslation?language_code=${
            i18n.language
          }&blog_category_uz=${title}&favorite=${favo}&pageNum=${pageNum}&queryNum=${queryNum}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (
        talaba.list?.length === 0 ||
        talaba?.language_code !== i18n.language
      ) {
        const d1 = await fetchData("Talaba hayoti", true, 1, 3);
        setTalaba(d1);
      }
    };
    fetchAllData();
  }, [i18n.language]);

  const d = useMemo(
    () => talaba?.list?.sort((a, b) => b?.id - a?.id),
    [talaba]
  );

  return (
    <Container className="root-container">
      <div className="root-wrapper">
        <Title
          title={t("student.title")}
          subtitle={t("student.desc")}
          button={t("student.btn")}
          to={"student-life"}
          $type={"light"}
        >
          <Layout $type="talaba">
            <div className="grid">
              <div className="grid__item" data-aos="fade-up">
                <LargeBanner
                  item={d && d[0]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[0]?.id : d[0]?.blog_id
                      }`
                    )
                  }
                />
                <LargeBanner
                  item={d && d[1]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[1]?.id : d[1]?.blog_id
                      }`
                    )
                  }
                />
              </div>
              <div data-aos="fade-up">
                <LargeBanner
                  item={d && d[2]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[2]?.id : d[2]?.blog_id
                      }`
                    )
                  }
                />
              </div>
              <div className="grid__large" data-aos="fade-up">
                <img
                  className="grid__large__img"
                  loading="lazy"
                  src={filterSt}
                />
                <div className="student">
                  <img
                    loading="lazy"
                    src={jasco}
                    alt=""
                    className="student__img"
                  />
                  <div className="student__name">Davron Toshmatov</div>
                  <div className="student__group">
                    "SIRIUS CLUB" jamoasi a'zosi
                  </div>
                  <div className="student__p">
                    Har bir talaba hayotda o'z oldiga yuksak maqsadlarni qo'yib,
                    harakatdan to'xtamasdan, o'z shaxsiy "men"ini rivojlantirgan
                    holda faqat oldinga intilishi lozim. Agarda talaba
                    rivojlansa — ta'lim rivojlanadi, ta'lim rivojlansa — ilm
                    rivojlanadi, ilm rivojlansa — davlat rivojlanadi, davlat
                    rivojlansa — mintaqa rivojlanadi, mintaqa rivojlansa — butun
                    dunyo rivojlanadi! Dunyoni rivojlantirmoqchimisiz, unda
                    avval uni o'zinggizdan boshlang!
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </Title>
      </div>
    </Container>
  );
};

export default Talaba;
