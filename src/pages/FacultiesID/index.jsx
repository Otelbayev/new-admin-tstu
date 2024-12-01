import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/Faculties/Header";
import Showcase from "../../components/Faculties/Showcase";
import IlmiyMarkazCart from "../../components/IlmiyMarkazCart";
import {
  IlmiyMarkaz,
  Kafedra,
  KafedraWrap,
  Orinbosar,
  Yonalish,
  Wrap,
} from "./style";
import { useNavigate, useParams } from "react-router-dom";
import DekanCart from "../../components/Faculties/DekanCart";
import Dekans from "../../components/Faculties/Dekan";
import Footer from "../../components/Footer";
import Yonalishlar from "../../components/Faculties/Yonalishlar";
import { Title } from "../../components/Generics";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHandleScroll } from "../../hooks/useHandleScroll";
import { Helmet } from "react-helmet";
import { useFacultiesContext } from "../../context/FacultiesContext";
import { useTeachersContext } from "../../context/TeachersContext";

const FacultiesID = () => {
  const naviagte = useNavigate();
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const [kafedra, setKafedra] = useState([]);
  const [scientific, setScientific] = useState([]);
  const [bakalavr, setBakalavr] = useState([]);
  const [magistr, setMagistr] = useState([]);
  const [lab, setlab] = useState([]);

  const aboutRef = useRef();
  const kafedraRef = useRef();
  const centerRef = useRef();
  const [faculty, setFaculty] = useState({});

  const { data } = useFacultiesContext();
  const { facultyTeachers, setFacultyTeachers } = useTeachersContext();

  const dataCache = useMemo(() => {
    if (i18n.language === "uz") {
      return data.list?.find((e) => e.id == id);
    }
    return data.list?.find((e) => e.departament_?.id == id);
  }, [data]);

  const uniId = useMemo(() => {
    if (i18n.language === "uz") {
      return data.list?.find((e) => e.id == id)?.id;
    }
    return data.list?.find((e) => e.departament_?.id == id)?.departament_?.id;
  }, [data]);

  const getFaculty = async () => {
    if (uniId == id) {
      setFaculty(dataCache);
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
        setFaculty(res.data);
      }
    }
  };

  const getChild = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamentfacultychild/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamenttranslationfacultychild/${id}?language_code=${
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
      setKafedra(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Kafedra" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Kafedra"
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

  const getPersonData = async () => {
    if (
      facultyTeachers?.length === 0 ||
      facultyTeachers[0]?.language_?.code !== i18n.language
    ) {
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
        setFacultyTeachers(res.data);
        console.log(res.data);
      }
    }
  };

  const dekan = useMemo(() => {
    return facultyTeachers?.find(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() === "dekan" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "dekan"
    );
  }, [facultyTeachers]);

  const orinbosar = useMemo(() => {
    return facultyTeachers?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "dekan o'rinbosari" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "dekan o'rinbosari"
    );
  }, [facultyTeachers]);

  const tyutor = useMemo(() => {
    return facultyTeachers?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "tyutor" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "tyutor"
    );
  }, [facultyTeachers]);

  console.log(tyutor);

  const getTitle = (title, language) => {
    const obj = {
      uz: `${title} fakultetiga xush kelibsiz!`,
      en: `Welcome to the Faculty of ${title}!`,
      ru: `Добро пожаловать на факультет ${title}!`,
    };

    return obj[language];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getPersonData();
    getChild();
    getFaculty();
  }, [i18n.language]);

  const links = [
    { title: t("facultet.links.link1"), refs: aboutRef },
    { title: t("facultet.links.link2"), refs: kafedraRef },
    { title: t("facultet.links.link3"), refs: centerRef },
  ];

  return (
    <div>
      <Helmet>
        <title>{faculty?.title}</title>
        <meta
          name="description"
          content={getTitle(faculty?.title, i18n.language)}
        />
        <link
          rel="icon"
          href={`${import.meta.env.VITE_BASE_URL_API}${
            faculty?.img_icon_?.url
          }`}
        />
      </Helmet>
      <div className="overflow-hidden">
        <Header links={links} />
        <Showcase
          bg={`${import.meta.env.VITE_BASE_URL_IMG}${faculty?.img_?.url}`}
          title={getTitle(faculty?.title, i18n.language)}
          button={t("facultet.btn")}
          onClick={() => useHandleScroll(aboutRef)}
        ></Showcase>
        <div className="root-container">
          <div className="root-wrapper">
            <Wrap>
              <div ref={aboutRef}>
                <Title title={t("facultet.about")} $border={"none"} />
                <div
                  dangerouslySetInnerHTML={{ __html: faculty?.text }}
                  data-aos="fade-up"
                  className="text"
                />
              </div>
              <Title title={t("facultet.dekan")} $border={"none"} />
              <Dekans img={dekan} data={dekan} />
              <Title title={t("facultet.orin")} $border={"none"} />
              <Orinbosar>
                {orinbosar.map((e) => (
                  <DekanCart key={e?.id} data={e} />
                ))}
                {tyutor.map((e) => (
                  <DekanCart key={e?.id} data={e} />
                ))}
              </Orinbosar>
              <div ref={kafedraRef}>
                <Title title={t("facultet.kafedra")} $border={"none"} />
                <KafedraWrap>
                  <Kafedra>
                    {kafedra?.map((e) => (
                      <Kafedra.Item
                        data-aos="zoom-in"
                        key={e.id}
                        onClick={() =>
                          naviagte(
                            `/${i18n.language}/kafedra/${
                              i18n.language === "uz"
                                ? e?.id
                                : e?.departament_?.id
                            }`
                          )
                        }
                        $bg={`${import.meta.env.VITE_BASE_URL_IMG}${
                          e?.img_?.url
                        }`}
                      >
                        <Kafedra.Content>
                          {e?.title}
                          <Kafedra.Arrow />
                        </Kafedra.Content>
                      </Kafedra.Item>
                    ))}
                  </Kafedra>
                </KafedraWrap>
              </div>
              <div>
                <Title title={t("lab")} $border={"none"} />
                <IlmiyMarkaz>
                  {lab?.length ? (
                    lab?.map((e) => (
                      <IlmiyMarkazCart
                        key={e?.id}
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
              <div ref={centerRef}>
                <Title title={t("facultet.markaz")} $border={"none"} />
                <IlmiyMarkaz>
                  {scientific?.length ? (
                    scientific?.map((e) => (
                      <IlmiyMarkazCart
                        key={e?.id}
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
              <Yonalish>
                <Yonalish.Left data-aos="fade-right">
                  <Yonalish.Title>{t("facultet.bakalavr")}</Yonalish.Title>
                  <Yonalishlar data={bakalavr} />
                </Yonalish.Left>
                <Yonalish.Right data-aos="fade-left">
                  <Yonalish.Title>{t("facultet.magistr")}</Yonalish.Title>
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

export default FacultiesID;
