import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useKafedraContext } from "../context/KafedraContext";

export const useKafedras = () => {
  const { i18n } = useTranslation();
  const { kafedras, setKafedras } = useKafedraContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getKafedras = async () => {
    if (
      kafedras.list?.length === 0 ||
      kafedras?.language_code !== i18n.language
    ) {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          i18n.language === "uz"
            ? `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttypesite/Kafedra`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/departament/getalldepartamenttranslationtypesite/Kafedra?language_code=${
                i18n.language
              }`
        );
        const result = await response.json();
        setKafedras(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getKafedras();
  }, [i18n.language]);

  return { kafedras, loading, error };
};
