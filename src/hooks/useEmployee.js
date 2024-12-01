import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useEmployee = (title, favo) => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/persondata/sitegetallpersondata?employee_type=${title}`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/persondata/sitegetallpersondatatranslation?language_code=${
                i18n.language
              }&employee_type=${title}`
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
  }, [i18n.language, title, favo]);

  return { data, loading, error };
};
