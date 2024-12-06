import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const IpContext = createContext();

export const useIpContext = () => useContext(IpContext);

const IpContextProvider = ({ children }) => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        setIp(response.data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }, []);

  return (
    <IpContext.Provider value={{ ip, setIp }}>{children}</IpContext.Provider>
  );
};

export default IpContextProvider;
