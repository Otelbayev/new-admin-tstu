import React, { useEffect, useState } from "react";
import Wrapper from "../../../../components/Wrapper";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../../components/DataTable";

const Main = () => {
  const { loading, error, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/statisticalnumbers/getallstatisticalnumbers`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Statistics" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        setIsDelete={setIsDelete}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/statisticalnumbers/deletestatisticalnumbers`
        }
        edit={"statistics/edit"}
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
