import { createContext, useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";

const DepartmentContext = createContext();

export const useDepartmentContext = () => useContext(DepartmentContext);

const DepartmentProvider = ({ children }) => {
  const { sendRequest } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentType, setDepartmentType] = useState([]);
  const [sidebarDepartment, setSidebarDepartment] = useState([]);
  const [isCreateDepartmentType, setIsCreateDepartmentType] = useState(false);
  const [isDeleteDepartmentType, setIsDeleteDepartmentType] = useState(false);

  async function getSelectDepartment(value) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/selecteddepartament`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/departament/selectdepartamenttranslation?language_code=${value}`,
      headers: { Authorization: token },
    });

    if (res.status === 200) {
      setDepartmentOptions([
        { value: 0, label: "Departament", parent: null },
        ...res.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({
            value: e.id,
            label: e.title,
            parent: e?.departament_id,
          })),
      ]);
    }
  }

  async function getDepartmentType(value) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/deartamenttypecontroller/sitegetalldepartamentType`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/deartamenttypecontroller/sitegetalldepartamentTypetranslation?language_code=${value}`,
    });

    if (res.status === 200) {
      setDepartmentType(
        res.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({
            value: e.id,
            label: e.type,
            path: value === "uz" ? e?.type : e?.departament_type_?.type,
            parent: e?.departament_type_?.id,
          }))
      );
    }
  }

  async function getSidebarDepartment() {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/deartamenttypecontroller/sitegetalldepartamentType`,
      headers: { Authorization: token },
    });
    if (res.status === 200) {
      setSidebarDepartment(
        res.data
          .sort((a, b) => a.id - b.id)
          .map(({ id, type }) => ({
            id,
            key: `department/${type?.toLowerCase()}`,
            label: type,
          }))
      );
    }
  }

  return (
    <DepartmentContext.Provider
      value={{
        departmentOptions,
        departmentType,
        sidebarDepartment,
        getSelectDepartment,
        getDepartmentType,
        getSidebarDepartment,
        isDeleteDepartmentType,
        setIsDeleteDepartmentType,
        isCreateDepartmentType,
        setIsCreateDepartmentType,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
