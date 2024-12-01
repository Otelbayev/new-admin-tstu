import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

const SearchContextProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SearchContext.Provider value={{ value, setValue, isOpen, setIsOpen }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
