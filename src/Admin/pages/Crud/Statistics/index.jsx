import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../components/data-table";

const cols = [
  {
    title: "#",
    width: 10,
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Number",
    dataIndex: "num",
  },
];

const Main = () => {
  const { loading, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/statisticalnumbers/getallstatisticalnumbers`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  const dataSource = useMemo(() => {
    return data.map((e) => ({
      id: e.id,
      title: e.title,
      num: e.numbers,
      status: e.status_.name,
    }));
  }, [data]);

  console.log(dataSource);

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Statistics" create={"/admin/statistics/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        setIsDelete={setIsDelete}
        del={"/statisticalnumbers/deletestatisticalnumbers/"}
        // edit={"statistics/edit"}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Main;
