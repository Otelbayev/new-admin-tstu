import React, { useEffect, useRef } from "react";
import img1 from "../../assets/Galereya/1.png";
import img2 from "../../assets/Galereya/2.png";
import img3 from "../../assets/Galereya/3.png";
import img4 from "../../assets/Galereya/4.png";
import img5 from "../../assets/Galereya/5.png";
import img6 from "../../assets/Galereya/6.png";
import img7 from "../../assets/Galereya/7.png";
import img8 from "../../assets/Galereya/2.png";
import img9 from "../../assets/Galereya/31.png";
import img10 from "../../assets/Galereya/32.png";
import img11 from "../../assets/Galereya/33.png";
import img12 from "../../assets/Galereya/34.png";
import img13 from "../../assets/Galereya/35.png";
import img14 from "../../assets/Galereya/36.png";
import img15 from "../../assets/Galereya/37.png";
import img16 from "../../assets/Galereya/38.png";
import img17 from "../../assets/Galereya/39.png";
import img18 from "../../assets/Galereya/40.png";
import img21 from "../../assets/Galereya/21.png";
import img22 from "../../assets/Galereya/22.png";
import img23 from "../../assets/Galereya/23.png";
import img24 from "../../assets/Galereya/24.png";
import img25 from "../../assets/Galereya/25.png";
import img26 from "../../assets/Galereya/26.png";
import img27 from "../../assets/Galereya/27.png";
import img28 from "../../assets/Galereya/28.png";
import img41 from "../../assets/Galereya/41.png";
import img42 from "../../assets/Galereya/42.png";
import img51 from "../../assets/Galereya/51.png";
import img52 from "../../assets/Galereya/52.png";
import img53 from "../../assets/Galereya/53.png";
import img54 from "../../assets/Galereya/54.png";
import icon from "../../assets/Galereya/btn.png";
import logo from "../../../public/logo/logo2.png";
import { Absolute, Container, Header, Showcase } from "./style";
import { NavLink } from "react-router-dom";
import { Lang, Title } from "../../components/Generics";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import { Helmet } from "react-helmet";

const Galereya = () => {
  const categoryRef = useRef();
  const galereyRef = useRef();
  const tadbirRef = useRef();
  const umumiyRef = useRef();

  const { i18n, t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>{t("galereya.title")}</title>
      </Helmet>
      <Container>
        <div
          className="root-container"
          style={{ background: "var(--white)", padding: "20px 0" }}
        >
          <div className="root-wrapper">
            <Header data-aos="fade-down">
              <NavLink to={`/${i18n.language}`}>
                <img
                  loading="lazy"
                  src={logo}
                  alt="logo tstu"
                  className="logo"
                />
              </NavLink>
              <Header.Right>
                <Header.Link
                  onClick={() => categoryRef.current.scrollIntoView()}
                >
                  {t("galereya.link1")}
                </Header.Link>
                <Header.Link
                  onClick={() => galereyRef.current.scrollIntoView()}
                >
                  {t("galereya.link2")}
                </Header.Link>
                <Header.Link onClick={() => tadbirRef.current.scrollIntoView()}>
                  {t("galereya.link3")}
                </Header.Link>
                <Header.Link onClick={() => umumiyRef.current.scrollIntoView()}>
                  {t("galereya.link4")}
                </Header.Link>
                <Header.Link>
                  <Lang mode="light" />
                </Header.Link>
              </Header.Right>
            </Header>
            <Showcase data-aos="fade-up">
              <Absolute>
                <Absolute.Title>{t("galereya.title")}</Absolute.Title>
                <Absolute.Desc>{t("galereya.desc")}</Absolute.Desc>
                <Absolute.Btn
                  onClick={() => umumiyRef.current.scrollIntoView()}
                  type="primary"
                >
                  <img loading="lazy" src={icon} alt="" />
                  {t("galereya.btn")}
                </Absolute.Btn>
              </Absolute>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(4, 200px)",
                  gap: "10px",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img1}
                  style={{ gridColumn: "4/5", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img2}
                  style={{ gridColumn: "4/5", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img3}
                  style={{ gridColumn: "4/5", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img4}
                  style={{ gridColumn: "3/4", gridRow: "2/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img5}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img8}
                  style={{ gridColumn: "1/2", gridRow: "4/5" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img7}
                  style={{ gridColumn: "2/3", gridRow: "4/5" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img6}
                  style={{ gridColumn: "3/5", gridRow: "4/5" }}
                />
              </div>
            </Showcase>
            <Title
              ref={categoryRef}
              title={t("galereya.t1")}
              // button="Barchasini ko‘rish"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(4, 200px)",
                  gap: "10px",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img6}
                  style={{ gridColumn: "1/3", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img21}
                  style={{ gridColumn: "3/4", gridRow: "1/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img22}
                  style={{ gridColumn: "4/5", gridRow: "1/2" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img23}
                  style={{ gridColumn: "1/2", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img24}
                  style={{ gridColumn: "2/3", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img25}
                  style={{ gridColumn: "4/5", gridRow: "2/3" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img26}
                  style={{ gridColumn: "1/2", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img27}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img28}
                  style={{ gridColumn: "3/5", gridRow: "3/4" }}
                />
              </div>
            </Title>
            <Title
              ref={galereyRef}
              title={t("galereya.t1")}
              // button="Barchasini ko‘rish"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(5, 200px)",
                  gap: "10px",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img9}
                  style={{ gridColumn: "1/2", gridRow: "1/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img10}
                  style={{ gridColumn: "2/3", gridRow: "1/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img11}
                  style={{ gridColumn: "3/4", gridRow: "1/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img12}
                  style={{ gridColumn: "4/5", gridRow: "1/4" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img13}
                  style={{ gridColumn: "1/2", gridRow: "4/5" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img14}
                  style={{ gridColumn: "2/3", gridRow: "4/5" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img15}
                  style={{ gridColumn: "3/5", gridRow: "4/5" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img16}
                  style={{ gridColumn: "1/3", gridRow: "5/6" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img17}
                  style={{ gridColumn: "3/4", gridRow: "5/6" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img18}
                  style={{ gridColumn: "4/5", gridRow: "5/6" }}
                />
              </div>
            </Title>
            <Title
              title={t("galereya.t2")}
              // button="Barchasini ko‘rish"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 200px)",
                  gap: "10px",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img41}
                  style={{ gridColumn: "1/5", gridRow: "1/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img42}
                  style={{ gridColumn: "1/2", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img42}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img42}
                  style={{ gridColumn: "3/4", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img42}
                  style={{ gridColumn: "4/5", gridRow: "3/4" }}
                />
              </div>
            </Title>
            <Pagination
              current={1}
              style={{ textAlign: "center", margin: "25px 0" }}
              total={30}
            />
            <Title
              ref={tadbirRef}
              title={t("galereya.t3")}
              // button="Barchasini ko‘rish"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(2, 400px)",
                  gap: "10px",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img51}
                  style={{ gridColumn: "1/3", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img52}
                  style={{ gridColumn: "3/4", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img53}
                  style={{ gridColumn: "1/2", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img54}
                  style={{ gridColumn: "2/4", gridRow: "2/3" }}
                />
              </div>
            </Title>
            <Title
              ref={umumiyRef}
              title={t("galereya.t4")}
              //button="Barchasini ko‘rish"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 200px)",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img6}
                  style={{ gridColumn: "1/3", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img21}
                  style={{ gridColumn: "3/4", gridRow: "1/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img22}
                  style={{ gridColumn: "4/5", gridRow: "1/2" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img23}
                  style={{ gridColumn: "1/2", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img24}
                  style={{ gridColumn: "2/3", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img25}
                  style={{ gridColumn: "4/5", gridRow: "2/3" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img26}
                  style={{ gridColumn: "1/2", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img27}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img28}
                  style={{ gridColumn: "3/5", gridRow: "3/4" }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 200px)",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img6}
                  style={{ gridColumn: "1/3", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img21}
                  style={{ gridColumn: "3/4", gridRow: "1/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img22}
                  style={{ gridColumn: "4/5", gridRow: "1/2" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img23}
                  style={{ gridColumn: "1/2", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img24}
                  style={{ gridColumn: "2/3", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img25}
                  style={{ gridColumn: "4/5", gridRow: "2/3" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img26}
                  style={{ gridColumn: "1/2", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img27}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img28}
                  style={{ gridColumn: "3/5", gridRow: "3/4" }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 200px)",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img6}
                  style={{ gridColumn: "1/3", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img21}
                  style={{ gridColumn: "3/4", gridRow: "1/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img22}
                  style={{ gridColumn: "4/5", gridRow: "1/2" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img23}
                  style={{ gridColumn: "1/2", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img24}
                  style={{ gridColumn: "2/3", gridRow: "2/3" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img25}
                  style={{ gridColumn: "4/5", gridRow: "2/3" }}
                />

                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img26}
                  style={{ gridColumn: "1/2", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img27}
                  style={{ gridColumn: "2/3", gridRow: "3/4" }}
                />
                <img
                  data-aos="zoom-in"
                  loading="lazy"
                  src={img28}
                  style={{ gridColumn: "3/5", gridRow: "3/4" }}
                />
              </div>
            </Title>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Galereya;
