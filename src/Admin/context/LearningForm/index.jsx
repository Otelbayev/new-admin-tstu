import axios from "axios";
import { createContext, useContext, useState } from "react";

const LearningFormContext = createContext();

export const useLearningFormContext = () => useContext(LearningFormContext);

const LearningFormProvider = ({ children }) => {
  const [learningForm, setLearningForm] = useState([]);

  const getLangForm = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/learningform/getalllearningformselect`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
        },
      }
    );

    res.status === 200 &&
      setLearningForm(
        res.data?.map((e) => ({
          value: e.id,
          label: e.title,
        }))
      );
  };

  return (
    <LearningFormContext.Provider value={{ learningForm, getLangForm }}>
      {children}
    </LearningFormContext.Provider>
  );
};

export default LearningFormProvider;
