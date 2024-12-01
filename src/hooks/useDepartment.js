import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useDepartment = (title, pagination) => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = new URLSearchParams(location.search);
  const def = url.get("page");
  const [page, setPage] = useState(def || 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttypesite/${title}?${
                pagination ? `&pageNum=${page}` : ""
              }`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttranslationtypesite/${title}?language_code=${
                i18n.language
              }${pagination ? `&pageNum=${page}` : ""}`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language, title, page]);

  return { data, loading, error, page, setPage };
};
