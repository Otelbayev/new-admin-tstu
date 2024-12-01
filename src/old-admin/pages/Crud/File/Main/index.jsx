import React, { useEffect, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";

const Main = () => {
  const { sendRequest, loading, error } = useAxios();

  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/files/getallfiles`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDeleted]);

  return (
    <Wrapper title="File" create="true">
      <DataTable
        data={data}
        loading={loading}
        erorr={error}
        setIsDelete={setIsDeleted}
        del={`${import.meta.env.VITE_BASE_URL_API}/files/deletefiles`}
        edit={"file/edit"}
        col={[
          { data: "id", title: "#" },
          { data: "title", title: "Title" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
