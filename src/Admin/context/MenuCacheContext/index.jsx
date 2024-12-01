import { createContext, useContext } from "react";

const MenuCacheContext = createContext();

export const useMenuCacheContext = () => useContext(MenuCacheContext);

const MenuCacheContextProvider = ({ children }) => {
  const [menuCache, setMenuCache] = useState({});
  return (
    <MenuCacheContext.Provider value={{}}>{children}</MenuCacheContext.Provider>
  );
};

export default MenuCacheContextProvider;
