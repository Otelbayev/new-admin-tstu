import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../../components/Wrapper";

const DepartmentType = () => {
  const { sendRequest, loading, error } = useAxios();

  const [isDeleted, setIsDeleted] = useState(false);
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/getalldepartamentDetail`,
      headers: {
        Authorization: token,
      },
    });
    response.status === 200 &&
      setData(response?.data?.sort((b, a) => b.id - a.id));
  };

  useEffect(() => {
    getData();
  }, [isDeleted]);

  return (
    <Wrapper title="Department Details" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/departamentDetaildetail/deletedepartamentDetail`
        }
        edit={"department-details/edit"}
        setIsDelete={setIsDeleted}
        col={[
          { data: "id", title: "# " },
          { data: "text_json", title: "Text" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default DepartmentType;
