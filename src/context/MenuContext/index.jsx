import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MenuContext = createContext();

export const useMenuContext = () => useContext(MenuContext);

const MenuProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [topMenu, setTopMenu] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          i18n.language === "uz"
            ? `${import.meta.env.VITE_BASE_URL_API}/menu/sitegetallmenu`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/menu/sitegetallmenutranslation?language_code=${i18n.language}`
        );
        setData(res.data.filter((e) => !e.top_menu));
        setTopMenu(res.data.filter((e) => e.top_menu));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, [i18n.language]);

  return (
    <MenuContext.Provider value={{ loading, error, data, topMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
export default MenuProvider;
