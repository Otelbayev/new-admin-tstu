import { createContext, useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

const LocationProvider = ({ children }) => {
  const { sendRequest } = useAxios();
  const [countryData, setCountryData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  async function getSelectCountry(value) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/country/sitegetallcountry`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/country/sitegetallcountrytranslation?language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (res.status === 200) {
      setCountryData(
        res.data.map((e) => ({
          value: e.id,
          label: e.title,
          parent: e?.country_id,
        }))
      );
    }
  }

  async function getSelectRegion(value, country_id) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/territorie/sitegetallterritorie?country_id=${country_id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/territorie/sitegetallterritorietranslation?country_translation_id=${country_id}&language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    res.status === 200 &&
      setRegionData(
        res.data.map((e) => ({
          value: e.id,
          label: e.title,
          parent: e?.territorie_id,
        }))
      );
  }

  return (
    <LocationContext.Provider
      value={{ countryData, getSelectCountry, regionData, getSelectRegion }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
