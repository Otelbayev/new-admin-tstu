import React, { useEffect, useRef } from "react";
import Header from "../../components/Arm/Header";
import Footer from "../../components/Arm/Footer";
import {
  Showcase,
  Content,
  Wrap,
  Service,
  Icons,
  Tadbirlar,
  News,
  VideoBanner,
  Books,
  Audios,
} from "./style";
import ShowcaseBottom from "../../components/Arm/ShowcaseBottom";
import { useId } from "../../hooks/useId";
import { Title } from "../../components/Generics";
import Slider from "react-slick";
import SliderItem from "../../components/Arm/SliderItem";
import coworking from "../../assets/ARM/coworking.png";
import phone from "../../assets/ARM/Phone.png";
import Tadbir from "../../components/Arm/Tadbir";
import NewsBanner from "../../components/Arm/NewsBanner";
import bg from "../../assets/ARM/bgGroup.png";
import videoBanner from "../../assets/ARM/bgRector.png";
import player from "../../assets/ARM/Button.png";
import Book from "../../components/Arm/Book";
import gazeta from "../../assets/ARM/gazeta.png";
import Audio from "../../components/Arm/Audio";
import ibtido from "../../assets/ARM/ibtido.png";
import Video from "../../components/Arm/Video";
import video from "../../assets/ARM/lib.png";

const Arm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prop = [
    {
      id: useId(),
      num: 7,
      add: " ta",
      sub: "O‘quv zallari",
    },
    {
      id: useId(),
      num: 150,
      sub: "Categorya",
    },
    {
      id: useId(),
      sub: "Kitoblar",
      num: 300,
      add: " +",
    },
    {
      id: useId(),
      num: 90,
      add: " %",
      sub: "Kitoblar",
    },
  ];

  const sliderProp = [
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: false,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: true,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: false,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: true,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: false,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: true,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: false,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: true,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: false,
    },
    {
      id: useId(),
      title: "“Coworking” markazi.",
      img: coworking,
      reverse: true,
    },
  ];

  const setting = {
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  };

  const tadbirprop = [
    {
      id: useId(),
      img: "flag",
      title: "Why smart speakers might be a really dumb choice",
      desc: "Ultrices mi tempus imperdiet nulla malesuada pellentesque. Euismod quis viverra nibh cras pulvinar mattis nunc sed",
      left: "by Corabelle Durrad",
      right: "02.10.2022",
      icon: true,
    },
    {
      id: useId(),
      img: "flag",
      title: "Why smart speakers might be a really dumb choice",
      desc: "Ultrices mi tempus imperdiet nulla malesuada pellentesque. Euismod quis viverra nibh cras pulvinar mattis nunc sed",
      left: "by Corabelle Durrad",
      right: "02.10.2022",
      icon: true,
    },
    {
      id: useId(),
      img: "flag",
      title: "Why smart speakers might be a really dumb choice",
      desc: "Ultrices mi tempus imperdiet nulla malesuada pellentesque. Euismod quis viverra nibh cras pulvinar mattis nunc sed",
      left: "by Corabelle Durrad",
      right: "02.10.2022",
      icon: true,
    },
    {
      id: useId(),
      img: "flag",
      title: "Why smart speakers might be a really dumb choice",
      desc: "Ultrices mi tempus imperdiet nulla malesuada pellentesque. Euismod quis viverra nibh cras pulvinar mattis nunc sed",
      left: "by Corabelle Durrad",
      right: "02.10.2022",
      icon: true,
    },
  ];

  const newsBanner = {
    img: bg,
    top: "Kitob ko’rgazma",
    title:
      "Kitob ko’rgazmasi bo’ldi va talabar bilan muhokama qilingi va kitoblar berildi",
    bottom: ["16:00", "15-avgust"],
  };

  const mainRef = useRef();
  const bazaRef = useRef();
  const armRef = useRef();
  const collectRef = useRef();
  const newsRef = useRef();
  const aloqaRef = useRef();

  return (
    <div style={{ overflow: "hidden" }}>
      <Header
        mainRef={mainRef}
        bazaRef={bazaRef}
        armRef={armRef}
        collectRef={collectRef}
        newsRef={newsRef}
        aloqaRef={aloqaRef}
      />
      <Showcase>
        <div className="root-container">
          <div className="root-wrapper">
            <Content data-aos="zoom-in">
              <div>
                <Content.Title>
                  Axborot resurs markazidan foydalanishni boshlang !
                </Content.Title>
                <Content.Btn
                  onClick={() => newsRef.current.scrollIntoView()}
                  type="primary"
                >
                  Elektron katalog
                </Content.Btn>
              </div>
            </Content>
          </div>
        </div>
      </Showcase>
      <div className="root-container">
        <div className="root-wrapper" style={{ position: "relative" }}>
          <ShowcaseBottom prop={prop} />
          <Wrap>
            <Title $border="none" ref={mainRef} title="O‘quv zallari" />
            <Slider {...setting}>
              {sliderProp.map((item) => (
                <SliderItem key={item.id} prop={item} />
              ))}
            </Slider>
            <div ref={bazaRef} style={{ margin: "20px 0" }}>
              <Service>
                <Service.Left>
                  <Title $border="none" title="Xizmatlar" />
                  <Service.LeftItem>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.First />
                      <div>
                        <Service.Title>Kutubxonachi yordami</Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.Fourth />
                      <div>
                        <Service.Title>Adabiyotni bron qilish</Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.Second />
                      <div>
                        <Service.Title>Elektron baza</Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.Fifth />
                      <div>
                        <Service.Title>Ijtimoiy madaniyat</Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.Thrid />
                      <div>
                        <Service.Title>Kurslar</Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                    <Service.Cart data-aos="zoom-in">
                      <Icons.Sixth />
                      <div>
                        <Service.Title>
                          UDK indeksnlarini tayinlash
                        </Service.Title>
                        <Service.Desc>
                          Velit egestas dui id ornare arcu odio. Euismod
                          elementum nisi quis eleifend quam adipiscings
                        </Service.Desc>
                      </div>
                    </Service.Cart>
                  </Service.LeftItem>
                </Service.Left>
                <Service.Right>
                  <img data-aos="fade-left" loading="lazy" src={phone} alt="" />
                </Service.Right>
              </Service>
            </div>
            <Title
              $border="none"
              title="Kutilayotgan tadbirlar"
              button="See More Articles"
              ref={armRef}
            >
              <Tadbirlar>
                {tadbirprop.map((item) => (
                  <Tadbir dataAos="zoom-in" prop={item} key={item.id} />
                ))}
              </Tadbirlar>
              <Pagination total="50" style={{ textAlign: "center" }} />
            </Title>
            <Title
              $border="none"
              title="Yangi kitoblar"
              button="See More Articles"
              ref={collectRef}
            >
              <News>
                <News.Left data-aos="fade-right">
                  <NewsBanner prop={newsBanner} />
                </News.Left>
                <News.Right>
                  {tadbirprop.slice(0, 3).map((item) => (
                    <Tadbir dataAos="zoom-in" prop={item} key={item.id} />
                  ))}
                </News.Right>
              </News>
              <Pagination total="50" style={{ textAlign: "center" }} />
            </Title>
          </Wrap>
        </div>
      </div>
      <VideoBanner ref={aloqaRef}>
        <img
          loading="lazy"
          src={videoBanner}
          className="abs-video-banner"
          alt=""
        />
        <VideoBanner.Abs>
          <div className="root-container">
            <div className="root-wrapper">
              <div className="video-banner-content">
                <div className="video-banner-content__left">
                  <div className="video-banner-content__left__title">
                    Axborot Resurs markazi haqida video lavha va uni ish tartibi
                  </div>
                  <div>
                    <div className="video-banner-content__left__acc">
                      <img loading="lazy" src={"flag"} alt="" />
                      <div>
                        <div className="video-banner-content__left__acc__name">
                          Shavkat Muxsimov
                        </div>
                        <div className="video-banner-content__left__acc__position">
                          ARM direktori
                        </div>
                      </div>
                    </div>
                    <div className="video-banner-content__left__desc">
                      Talaba uchun maslahat yoki qo’llab quvvatlash uchun maydon
                      Talaba uchun maslahat yoki qo’llab quvvatlash uchun maydon
                      Talaba uchun maslahat yoki qo’llab quvvatlash uchun maydon
                    </div>
                  </div>
                </div>
                <div className="video-banner-content__right">
                  <img loading="lazy" src={player} alt="" />
                </div>
              </div>
            </div>
          </div>
        </VideoBanner.Abs>
      </VideoBanner>
      <div className="root-container">
        <div className="root-wrapper">
          <Title
            $border="none"
            title="Yangi kitoblar"
            button="See More Articles"
            ref={newsRef}
          >
            <Books>
              <Book
                img={gazeta}
                title={"Yangi kitob nomi"}
                desc="Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror  malumot"
              />
              <Book
                img={gazeta}
                title={"Yangi kitob nomi"}
                desc="Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror  malumot"
              />
              <Book
                img={gazeta}
                title={"Yangi kitob nomi"}
                desc="Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror malumot Kitobga biroz tarif berish mumkin yoki biror  malumot"
              />
            </Books>
            <Pagination total="50" style={{ textAlign: "center" }} />
          </Title>
          <Title
            $border="none"
            title="Yangi kitoblar"
            button="See More Articles"
          >
            <Audios>
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
              <Audio
                img={ibtido}
                title="Kitob nomi va Kitob nomi va Kitob nomi"
                desc="Kitobga biroz tarif yoki biror qo’llab quvvatlash uchun maydon"
              />
            </Audios>
            <Pagination total="50" style={{ textAlign: "center" }} />
          </Title>
          <br />
          <Title
            title="Axborot resurs markazidan unimli foydalaning"
            subtitle="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy"
            $border={"none"}
          />
          <Video
            img={video}
            title="Kutubxonadan foydalanish qoidalari"
            desc="Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy"
          />
          <Video
            img={video}
            title="Kutubxonadan foydalanish qoidalari"
            desc="Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy"
            reverse="true"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Arm;
