import { createContext, useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const GenderContext = createContext();

export const useGenderContext = () => useContext(GenderContext);

const GenderProvider = ({ children }) => {
  const [genderData, setGenderData] = useState([]);
  const { sendRequest } = useAxios();

  const getGender = async (value) => {
    const response = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/gender/sitegetallgender`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/gender/sitegetallgendertranslation?language_code=${value}`,
    });
    response.status === 200 &&
      setGenderData(
        response.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({ value: e.id, label: e.gender, parent: e?.gender_id }))
      );
  };

  return (
    <GenderContext.Provider value={{ genderData, getGender }}>
      {children}
    </GenderContext.Provider>
  );
};

export default GenderProvider;
