import { useEffect, useState } from "react";
import { useFacultiesContext } from "../context/FacultiesContext";
import { useTranslation } from "react-i18next";

export const useFaculties = () => {
  const { i18n } = useTranslation();
  const { data, setData } = useFacultiesContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getFaculties = async () => {
    if (data.list?.length === 0 || data?.language_code !== i18n.language) {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttypesite/Fakultet`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttranslationtypesite/Fakultet?language_code=${
                i18n.language
              }`
        );
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getFaculties();
  }, [i18n.language]);

  return { data, loading, error };
};
