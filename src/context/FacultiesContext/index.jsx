import { createContext, useContext, useState } from "react";

const FacultiesContext = createContext();

export const useFacultiesContext = () => useContext(FacultiesContext);

const FacultiesContextProvider = ({ children }) => {
  const [data, setData] = useState({ list: [] });

  return (
    <FacultiesContext.Provider value={{ data, setData }}>
      {children}
    </FacultiesContext.Provider>
  );
};

export default FacultiesContextProvider;
