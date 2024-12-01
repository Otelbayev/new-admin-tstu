import { createContext, useContext, useState } from "react";

const SchuldeContext = createContext();

export const useSchuldeContext = () => useContext(SchuldeContext);

const SchuldeProvider = ({ children }) => {
  const [schulde, setSchulde] = useState("0");

  return (
    <SchuldeContext.Provider value={{ schulde, setSchulde }}>
      {children}
    </SchuldeContext.Provider>
  );
};

export default SchuldeProvider;
