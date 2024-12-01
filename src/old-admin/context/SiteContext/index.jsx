import axios from "axios";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const SiteContext = createContext();

export const useSiteContext = () => useContext(SiteContext);

const SiteContextProvider = ({ children }) => {
  const [siteData, setSiteData] = useState([]);
  const [siteTypeData, setSiteTypeData] = useState([]);

  const getSiteData = async (value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/site/sitegetallsite`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/site/sitegetallsitetranslation?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    res.status === 200 &&
      setSiteData(
        res?.data
          ?.sort((a, b) => a.id - b.id)
          ?.map((e) => ({ value: e.id, label: e.title, parent: e?.site_id }))
      );
  };

  const getSiteTypeData = async (value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/sitetype/sitegetallsitetype`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/sitetype/sitegetallsitetypetranslation?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    res.status === 200 &&
      setSiteTypeData(
        res.data
          ?.sort((a, b) => a.id - b.id)
          ?.map((e) => ({
            value: e.id,
            label: e.type,
            parent: e?.site_type_?.id,
          }))
      );
  };

  return (
    <SiteContext.Provider
      value={{ siteData, getSiteData, siteTypeData, getSiteTypeData }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContextProvider;
