import axios from "axios";
import { createContext, useContext, useState } from "react";


const EducationLanguageContext = createContext();

export const useEducationLanguageContext = () =>
  useContext(EducationLanguageContext);

const EducationLanguageProvider = ({ children }) => {
  const [eduLanguage, setEduLanguage] = useState([]);

  const getEduLang = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/educationlanguage/getalleducationlanguageselect`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
        },
      }
    );

    res.status === 200 &&
      setEduLanguage(
        res.data?.map((e) => ({
          value: e.id,
          label: e.title,
        }))
      );
  };

  return (
    <EducationLanguageContext.Provider value={{ eduLanguage, getEduLang }}>
      {children}
    </EducationLanguageContext.Provider>
  );
};

export default EducationLanguageProvider;
