import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo2.png";
import tel from "../../assets/icons/tel.svg";
import email from "../../assets/icons/email.svg";
import loc from "../../assets/icons/loc.svg";
import loc2 from "../../assets/icons/loc2.svg";
import {
  Container,
  Wrapper,
  Left,
  Title,
  Icons,
  P,
  Media,
  Right,
  Row,
  Link,
  I,
  T,
  Btn,
  Social,
  Counter,
} from "./style";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <Container className="root-container">
      <Wrapper data-aos="fade-up" className="root-wrapper">
        <Left>
          <Title>{t("footer.title")}</Title>
          <Icons>
            <NavLink to="">
              <img loading="lazy" style={{ height: "40px" }} src={logo} />
            </NavLink>
            <NavLink to="">
              <img loading="lazy" style={{ height: "40px" }} src={logo1} />
            </NavLink>
          </Icons>
          <P>{t("footer.desc")}</P>
          {/* <Media>
            <NavLink target="_blank" to="https://youtube.com/@iwssei">
              <Social.Youtube />
            </NavLink>
            <NavLink target="_blank" to="https://instagram.com/jasur.otelbayev">
              <Social.Instagram />
            </NavLink>
            <NavLink target="_blank" to="https://t.me/jasurdev1604">
              <Social.Telegram />
            </NavLink>
            <NavLink target="_blank" to="https://facebook.com">
              <Social.Facebook />
            </NavLink>
          </Media> */}
          <Counter>
            <NavLink
              to="https://www.uz/uz/res/visitor/index?id=2606"
              target="_blank"
            >
              {/* <img
                loading="lazy"
                src="https://cnt0.www.uz/counter/collect?id=2606&pg=http%3A//uzinfocom.uz&col=340F6E&t=ffffff&p=BD6F6F"
              /> */}
              <div
        dangerouslySetInnerHTML={{
          __html: `
            <!-- START WWW.UZ TOP-RATING -->
            <script language="javascript" type="text/javascript">
              top_js="1.0";top_r="id=2606&r="+escape(document.referrer)+"&pg="+escape(window.location.href);document.cookie="smart_top=1; path=/"; top_r+="&c="+(document.cookie?"Y":"N");
            </script>
            <script language="javascript1.1" type="text/javascript">
              top_js="1.1";top_r+="&j="+(navigator.javaEnabled()?"Y":"N");
            </script>
            <script language="javascript1.2" type="text/javascript">
              top_js="1.2";top_r+="&wh="+screen.width+'x'+screen.height+"&px="+
              (((navigator.appName.substring(0,3)=="Mic"))?screen.colorDepth:screen.pixelDepth);
            </script>
            <script language="javascript1.3" type="text/javascript">
              top_js="1.3";
            </script>
            <script language="JavaScript" type="text/javascript">
              top_rat="&col=340F6E&t=ffffff&p=BD6F6F";top_r+="&js="+top_js+"";document.write('<img src="https://cnt0.www.uz/counter/collect?'+top_r+top_rat+'" width=0 height=0 border=0 />');
            </script>
            <noscript>
              <img height="0" src="https://cnt0.www.uz/counter/collect?id=2606&pg=http%3A//uzinfocom.uz&col=340F6E&t=ffffff&p=BD6F6F" width="0" border="0" />
            </noscript>
            <!-- FINISH WWW.UZ TOP-RATING -->
          `,
        }}
      />
            </NavLink>
            <NavLink className="a" to="sitemap.xml" target="_blank">
              <i className="fa-solid fa-sitemap"></i>
            </NavLink>
            <NavLink className="a" to="feed.xml" target="_blank">
              <i className="fa-solid fa-rss"></i>
            </NavLink>
          </Counter>
        </Left>
        <Right>
          <Row $first="true">
            <Link to="tel:+998712990001">
              <I loading="lazy" src={tel} />
              +998 71-299-00-01
            </Link>
            <Link to="mailto:rektorat@tstu.uz">
              <I loading="lazy" src={email} />
              rektorat@tstu.uz
            </Link>
            <Link
              to="https://www.google.com/maps?ll=41.277242,69.282048&z=15&t=m&hl=ru&gl=US&mapclient=embed&cid=14248940122321697435"
              target="_blank"
            >
              <I loading="lazy" src={loc2} />
              {t("footer.loc")}
            </Link>
            <div className="bbtn">
              <NavLink
                to="https://www.google.com/maps?ll=41.277242,69.282048&z=15&t=m&hl=ru&gl=US&mapclient=embed&cid=14248940122321697435"
                target="_blank"
              >
                <I loading="lazy" src={loc} />
                {t("footer.take")}
              </NavLink>
            </div>
          </Row>
          <Row>
            <T>{t("footer.about.title")}</T>
            <Link to={`/${i18n.language}`}>{t("footer.about.home")}</Link>
            <Link to={`/${i18n.language}/aboutus`}>
              {t("footer.about.biz")}
            </Link>
            <Link to={`/${i18n.language}/education`}>
              {t("footer.about.talim")}
            </Link>
            <Link target="_blank" to={"http://alumni.tstu.uz/"}>
              {t("footer.about.bitirvchi")}
            </Link>
            <Link target="_blank" to={"http://alumni.tstu.uz/"}>
              {t("footer.about.manaviyat")}
            </Link>
            <Link to={`/${i18n.language}/page/110`}>
              {t("footer.about.qabul")}
            </Link>
          </Row>
          <Row>
            <T>{t("footer.links.title")}</T>
            <Link target="_blank" to={`https://hemis.tstu.uz/dashboard/login`}>
              {t("footer.links.xoldim")}
            </Link>
            <Link
              target="_blank"
              to={`https://student.tstu.uz/dashboard/login`}
            >
              {t("footer.links.talaba")}
            </Link>
            <Link target="_blank" to={`https://elib.tstu.uz/`}>
              {t("footer.links.kutubxona")}
            </Link>
            {/* <Link to={`/${i18n.language}`}>{t("footer.links.mail")}</Link> */}
            {/* <Link to={`/${i18n.language}`}>{t("footer.links.jurnal")}</Link> */}
            <Link target="_blank" to={`https://moodle.tstu.uz/`}>
              {t("footer.links.moodle")}
            </Link>
          </Row>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
