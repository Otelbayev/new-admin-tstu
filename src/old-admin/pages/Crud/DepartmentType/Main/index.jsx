import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useDepartmentContext } from "../../../../context/DepartmentContext";
import Wrapper from "../../../../components/Wrapper";

const DepartmentType = () => {
  const { sendRequest, loading, error } = useAxios();
  const { isDeleteDepartmentType, setIsDeleteDepartmentType } =
    useDepartmentContext();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/deartamenttypecontroller/getalldepartamentType`,
      headers: {
        Authorization: token,
      },
    });
    response.status === 200 &&
      setData(response?.data?.sort((b, a) => b.id - a.id));
  };

  useEffect(() => {
    getData();
  }, [isDeleteDepartmentType]);

  return (
    <Wrapper title="Department Type" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/deartamenttypecontroller/deletedepartamentType`
        }
        edit={"departmenttype/edit"}
        setIsDelete={setIsDeleteDepartmentType}
        col={[
          { data: "id", title: "# " },
          { data: "type", title: "Type" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default DepartmentType;
