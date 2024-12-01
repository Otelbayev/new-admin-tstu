import React, { useMemo } from "react";

import { Container } from "./rating.style";
import Loading2 from "../../components/Loading2/index";
import Error from "../../components/Error";
import DepartmentCart from "./department-cart";
import { useTranslation } from "react-i18next";
import { useFaculties } from "../../hooks/useFaculties";

const Rating = () => {
  const { data, loading, error } = useFaculties();

  const { i18n, t } = useTranslation();

  const sortedData = useMemo(() => {
    return data?.list
      ? [...data.list].sort((a, b) => b.avarage_score - a.avarage_score)
      : [];
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
        <div className="title mt-3">{t("faculties.all")}</div>
        <Container>
          {sortedData.map((e) => (
            <DepartmentCart
              key={e?.id}
              title={e?.title}
              score={e?.avarage_score}
              id={i18n.language === "uz" ? e?.id : e?.departament_?.id}
              icon={e?.img_icon_?.url}
              img={e?.img_?.url}
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Rating;
