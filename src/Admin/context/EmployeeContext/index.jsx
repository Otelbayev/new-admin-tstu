import axios from "axios";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

const EmployeeContextProvider = ({ children }) => {
  const [employeeTypeData, setEmployeeTypeData] = useState([]);

  const getEmployeeType = async (value) => {
    const res = await axios.get(
      value === "uz"
        ? `${import.meta.env.VITE_BASE_URL_API}/employeetype/sitegetallemployeetype`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/employeetype/sitegetallemployeetypetranslation?language_code=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    res?.status === 200 &&
      setEmployeeTypeData(
        res.data?.map((e) => ({
          value: e.id,
          label: e.title,
          parent: e?.employee_?.id,
        }))
      );
  };

  return (
    <EmployeeContext.Provider value={{ getEmployeeType, employeeTypeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
