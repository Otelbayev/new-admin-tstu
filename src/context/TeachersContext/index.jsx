import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TeachersContext = createContext();

export const useTeachersContext = () => useContext(TeachersContext);

const TeachersProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [teachers, setTeachers] = useState([]);

  const [facultyTeachers, setFacultyTeachers] = useState([]);
  const [departmentTeachers, setDepartmentTeachers] = useState([]);

  useEffect(() => {
    setTeachers([...facultyTeachers, ...departmentTeachers]);
  }, [facultyTeachers, departmentTeachers]);

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        facultyTeachers,
        setFacultyTeachers,
        departmentTeachers,
        setDepartmentTeachers,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;
