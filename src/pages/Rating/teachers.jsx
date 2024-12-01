import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loading2 from "../../components/Loading2";
import Error from "../../components/Error";
import DekanCart from "../../components/Faculties/DekanCart";
import { Container } from "./rating.style";
import { useTeachers } from "../../hooks/useTeachers";

const Teachers = () => {
  const { t } = useTranslation();
  const { kaf: id } = useParams();
  const { data, loading, error } = useTeachers(id);

  const mudir = useMemo(() => {
    return data?.find(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "kafedra mudiri" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "kafedra mudiri"
    );
  }, [data]);

  const professor = useMemo(() => {
    return data?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "professor" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "professor"
    );
  }, [data]);

  const katta = useMemo(() => {
    return data?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "katta o'qituvchi" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "katta o'qituvchi"
    );
  }, [data]);

  const dotsent = useMemo(() => {
    return data?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "dotsent" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "dotsent"
    );
  }, [data]);

  const assistent = useMemo(() => {
    return data?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "assistent" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "assistent"
    );
  }, [data]);

  const doktarant = useMemo(() => {
    return data?.filter(
      (e) =>
        e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
          "doktorant" ||
        e?.persons_translation_?.employee_type_translation_?.employee_?.title
          ?.toLowerCase()
          ?.trim() === "doktorant"
    );
  }, [data]);

  if (loading) {
    return <Loading2 />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="root-container">
      <div className="root-wrapper">
        <div className="title mt-3">{t("about.professor")}</div>
        <Container>
          <DekanCart rating d data={mudir} />
          {professor?.map((e) => (
            <DekanCart key={e.id} rating d data={e} />
          ))}
          {dotsent?.map((e) => (
            <DekanCart key={e.id} rating d data={e} />
          ))}
          {katta?.map((e) => (
            <DekanCart key={e.id} rating d data={e} />
          ))}
          {assistent?.map((e) => (
            <DekanCart key={e.id} rating d data={e} />
          ))}
          {doktarant?.map((e) => (
            <DekanCart key={e.id} rating d data={e} />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Teachers;
