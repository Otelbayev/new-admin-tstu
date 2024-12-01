import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useAxios from "./../../hooks/useAxios";

const LanguageContex = createContext();

export const useLanguageContext = () => useContext(LanguageContex);
const LanguageContexProvider = ({ children }) => {
  const { sendRequest } = useAxios();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/language/sitegetalllanguage`,
      });
      setOptions([
        { id: 0, code: "uz", title: "O'zbek", title_short: "O'zb" },
        ...response?.data,
      ]);
    }

    getData();
  }, []);

  return (
    <LanguageContex.Provider value={{ options }}>
      {children}
    </LanguageContex.Provider>
  );
};

export default LanguageContexProvider;
