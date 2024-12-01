import axios from "axios";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [userTypeData, setUserTypeData] = useState([]);

  const getUserType = async (value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/usertype/selectgetallusertype`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/usertype/selectgetallusertypetranslation?language_code=${value}}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    res?.status === 200 &&
      setUserTypeData(
        res.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({
            value: e.id,
            label: e.type,
            parent: e?.user_types_?.id,
          }))
      );
  };

  return (
    <UserContext.Provider value={{ getUserType, userTypeData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
