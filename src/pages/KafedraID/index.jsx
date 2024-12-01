import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/Faculties/Header";
import Showcase from "../../components/Faculties/Showcase";
import Dekans from "../../components/Faculties/Dekan";
import DekanCart from "../../components/Faculties/DekanCart";
import Footer from "../../components/Footer";
import { IlmiyMarkaz, Orinbosar, Wrap, Yonalish } from "../FacultiesID/style";
import Yonalishlar from "../../components/Faculties/Yonalishlar";
import { Title } from "../../components/Generics";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHandleScroll } from "../../hooks/useHandleScroll";
import { useTranslation } from "react-i18next";
import IlmiyMarkazCart from "../../components/IlmiyMarkazCart";
import { Helmet } from "react-helmet";
import { useKafedraContext } from "../../context/KafedraContext";

const KafedraID = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { i18n } = useTranslation();

  const [data, setData] = useState({});
  const [mudir, setMudir] = useState({});
  const [professor, setProfessor] = useState([]);
  const [katta, setKatta] = useState([]);
  const [assistent, setAssistent] = useState([]);
  const [dotsent, setDotsent] = useState([]);
  const [doktarant, setDoktarant] = useState([]);
  const [scientific, setScientific] = useState([]);
  const [bakalavr, setBakalavr] = useState([]);
  const [magistr, setMagistr] = useState([]);
  const [lab, setlab] = useState([]);

  const aboutRef = useRef();
  const mudirRef = useRef();
  const yonalishRef = useRef();

  const { kafedras } = useKafedraContext();

  const dataCache = useMemo(() => {
    if (i18n.language === "uz") {
      return kafedras.list?.find((e) => e.id == id);
    }
    return kafedras.list?.find((e) => e.departament_?.id == id);
  }, [kafedras]);

  const uniId = useMemo(() => {
    if (i18n.language === "uz") {
      return kafedras.list?.find((e) => e.id == id)?.id;
    }
    return kafedras.list?.find((e) => e.departament_?.id == id)?.departament_
      ?.id;
  }, [kafedras]);

  const getKafedra = async () => {
    if (uniId == id) {
      setData(dataCache);
    } else if (
      dataCache?.id &&
      !dataCache?.language_?.code &&
      i18n.language === "uz"
    ) {
      setData(dataCache);
    } else {
      const res = await axios.get(
        i18n.language === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/sitegetbyiddepartament/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/sitegetbyuziddepartamenttranslation/${id}?language_code=${
              i18n.language
            }`
      );
      if (res.status === 200) {
        setData(res.data);
      }
    }
  };

  const getPersonData = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondatadepid/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondatatranslationdepuzid/${id}?language_code=${
            i18n.language
          }`
    );
    if (res.status === 200) {
      setMudir(
        res.data?.find(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "kafedra mudiri" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "kafedra mudiri"
        )
      );
      setKatta(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "katta o'qituvchi" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "katta o'qituvchi"
        )
      );
      setProfessor(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "professor" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "professor"
        )
      );
      setAssistent(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "assistent" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "assistent"
        )
      );
      setDotsent(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "dotsent" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "dotsent"
        )
      );
      setDoktarant(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "doktorant" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "doktorant"
        )
      );
    }
  };

  const getYon = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamentchild/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamenttranslationchild/${id}?language_code=${
            i18n.language
          }`
    );

    if (res.status === 200) {
      setScientific(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Ilmiy markaz" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Ilmiy markaz"
        )
      );
      setBakalavr(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Bakalavriat yo'nalishlari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Bakalavriat yo'nalishlari"
        )
      );
      setMagistr(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Magistratura yo‘nalishlari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Magistratura yo‘nalishlari"
        )
      );
      setlab(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "O'quv labaratoriyalari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "O'quv labaratoriyalari"
        )
      );
    }
  };

  const links = [
    { title: t("kafedra.links.link1"), refs: aboutRef },
    { title: t("kafedra.links.link2"), refs: yonalishRef },
  ];

  const getTitle = (title, language) => {
    const obj = {
      uz: `${title} kafedrasiga xush kelibsiz!`,
      en: `Welcome to the department of ${title}!`,
      ru: `Добро пожаловать на кафедру ${title}!`,
    };

    return obj[language];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getKafedra();
    getPersonData();
    getYon();
  }, [id, i18n.language]);

  return (
    <div>
      <Helmet>
        <title>{data?.title}</title>
        <meta
          name="description"
          content={getTitle(data?.title, i18n.language)}
        />
      </Helmet>
      <div className="overflow-hidden">
        <Header links={links} />
        <Showcase
          bg={`${import.meta.env.VITE_BASE_URL_IMG}${data?.img_?.url}`}
          title={getTitle(data?.title, i18n.language)}
          button={t("kafedra.btn")}
          onClick={() => useHandleScroll(aboutRef)}
        ></Showcase>

        <div className="root-container">
          <div className="root-wrapper">
            <Wrap>
              <Title
                ref={aboutRef}
                title={t("kafedra.about")}
                $border={"none"}
              />
              <p
                dangerouslySetInnerHTML={{ __html: data?.text }}
                data-aos="fade-up"
              />
              <Title
                ref={mudirRef}
                title={t("kafedra.mudir")}
                $border={"none"}
              />
              <Dekans data={mudir} />
              <Title title={t("kafedra.teachers")} $border={"none"} />
              <Orinbosar>
                {professor.map((e, index) => (
                  <DekanCart key={index} data={e} />
                ))}
                {dotsent.map((e, index) => (
                  <DekanCart key={index} data={e} />
                ))}
                {katta.map((e, index) => (
                  <DekanCart key={index} data={e} />
                ))}
                {assistent.map((e, index) => (
                  <DekanCart key={index} data={e} />
                ))}
                {doktarant.map((e, index) => (
                  <DekanCart key={index} data={e} />
                ))}
              </Orinbosar>
              <div>
                <Title title={t("lab")} $border={"none"} />
                <IlmiyMarkaz>
                  {lab?.length ? (
                    lab?.map((e, index) => (
                      <IlmiyMarkazCart
                        key={index}
                        to={`department/${
                          i18n.language === "uz" ? e?.id : e?.departament_?.id
                        }`}
                        $border={"#CECECE"}
                        dataAos="zoom-in"
                        item={e}
                      />
                    ))
                  ) : (
                    <div data-aos="fade-right">Ma'lumot mavjud emas!</div>
                  )}
                </IlmiyMarkaz>
              </div>
              <div>
                <Title title={t("facultet.markaz")} $border={"none"} />
                <IlmiyMarkaz>
                  {scientific?.length ? (
                    scientific?.map((e, index) => (
                      <IlmiyMarkazCart
                        key={index}
                        to={`department/${
                          i18n.language === "uz" ? e?.id : e?.departament_?.id
                        }`}
                        $border={"#CECECE"}
                        dataAos="zoom-in"
                        item={e}
                      />
                    ))
                  ) : (
                    <div data-aos="fade-right">Ma'lumot mavjud emas!</div>
                  )}
                </IlmiyMarkaz>
              </div>
              <Yonalish ref={yonalishRef}>
                <Yonalish.Left data-aos="fade-right">
                  <Yonalish.Title>{t("kafedra.bakalavr")}</Yonalish.Title>
                  <Yonalishlar data={bakalavr} />
                </Yonalish.Left>
                <Yonalish.Right data-aos="fade-left">
                  <Yonalish.Title>{t("kafedra.magistr")}</Yonalish.Title>
                  <Yonalishlar data={magistr} />
                </Yonalish.Right>
              </Yonalish>
            </Wrap>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default KafedraID;
