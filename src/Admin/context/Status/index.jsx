import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";

const StatusContext = createContext();

export const useStatusContext = () => useContext(StatusContext);

const StatusProvider = ({ children }) => {
  const [statusData, setStatusData] = useState([]);
  const { sendRequest } = useAxios();

  async function getStatus(value) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/status/selectgetallstatus`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/status/selectgetallstatustranslation?language_code=${value}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 &&
      setStatusData(
        res.data.map((e) => ({
          value: e.id,
          label: e.name,
          parent: e?.status_id,
        }))
      );
  }
  return (
    <StatusContext.Provider value={{ statusData, getStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
