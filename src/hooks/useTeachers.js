import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useTeachers = (code) => {
  const [id, setId] = useState(code);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const getPersonData = async () => {
      setError(false);
      setLoading(true);
      try {
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
          setLoading(false);
          setData(res.data);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getPersonData();
  }, [i18n.language, id]);

  return { data, loading, error, setId };
};
