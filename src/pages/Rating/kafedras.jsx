import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Container } from "./rating.style";
import DepartmentCart from "./department-cart";
import Loading2 from "../../components/Loading2";
import Error from "../../components/Error";
import { useKafedras } from "../../hooks/useKafedras";

const Kafedras = () => {
  const { i18n, t } = useTranslation();

  const { kafedras, loading, error } = useKafedras();

  const { fak: id } = useParams();

  const data = useMemo(() => {
    if (kafedras?.list) {
      if (i18n.language === "uz") {
        return kafedras.list
          .filter((e) => e.parent_id == id)
          .sort((a, b) => b.avarage_score - a.avarage_score);
      }
      return kafedras?.list.filter((e) => e.departament_?.parent_id == id);
    }
  }, [kafedras, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading2 />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="root-container">
      <div className="root-wrapper">
        <div className="title mt-3">{t("faculties.kafedra")}</div>
        <Container>
          {data?.map((e) => (
            <DepartmentCart
              key={e?.id}
              title={e?.title}
              score={e?.avarage_score}
              id={i18n.language === "uz" ? e?.id : e?.departament_?.id}
              icon={e?.img_icon_?.url}
              img={e?.img_?.url}
              kafedra
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Kafedras;
