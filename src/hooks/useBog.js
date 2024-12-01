import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const useBlog = (title, favo, pagination, pageNum, queryNum) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = new URLSearchParams(location.search);
  const def = url.get("page");
  const defq = url.get("query");
  const defb = url.get("category");

  const [page, setPage] = useState(def || pageNum || 1);
  const [query, setQuery] = useState(defq || queryNum || 10);
  const [category, setCategory] = useState(defb || "all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/blogcontroller/sitegetallblog?blog_category=${
                title === "all" ? "" : title
              }&favorite=${favo}${
                pagination || pageNum ? `&pageNum=${page}` : ""
              }${query === 10 ? "" : `&queryNum=${query}`}`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/blogcontroller/sitegetallblogtranslation?language_code=${
                i18n.language
              }&blog_category_uz=${title === "all" ? "" : title}${
                favo ? "&favorite=true" : ""
              }${pagination || pageNum ? `&pageNum=${page}` : ""}${
                query === 10 ? "" : `&queryNum=${query}`
              }`
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
  }, [i18n.language, title, favo, page, query, category]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    query,
    setQuery,
    category,
    setCategory,
  };
};
