import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const PersonContext = createContext();

export const usePersonContext = () => useContext(PersonContext);

const PersonContextProvider = ({ children }) => {
  const [personData, setPersonData] = useState([]);

  const getPersonData = async (value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/person/sitegetallperson`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/person/sitegetallpersontranslation?language_code=${value}`
    );

    res?.status === 200 &&
      setPersonData(
        res.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({
            value: e.id,
            label: `${e.firstName} ${e.lastName} ${e.fathers_name}`,
            parent: e?.persons_?.id,
          }))
      );
  };

  return (
    <PersonContext.Provider value={{ getPersonData, personData }}>
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContextProvider;
