import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const useDateContext = () => useContext(DateContext);

const DateContextProvider = ({ children }) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const [old_year, setOldYear] = useState(month >= 8 ? year : year - 1);

  return (
    <DateContext.Provider value={{ old_year, setOldYear }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
