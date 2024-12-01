import React, { useEffect, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";

const Create = () => {
  const { loading, error, sendRequest } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/employeetype/getallemployeetype`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    response.status === 200 &&
      setData(response.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title={"EmployeeType"} create={true}>
      <DataTable
        loading={loading}
        error={error}
        data={data}
        setIsDelete={setIsDelete}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/employeetype/deleteemployeetype`
        }
        edit={"employeetype/edit"}
        col={[
          { data: "id", title: "#" },
          { data: "title", title: "Title" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Create;
