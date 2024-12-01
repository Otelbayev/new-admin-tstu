import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";

const Main = () => {
  const { sendRequest, loading } = useAxios();

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

  const dataSource = useMemo(() => {
    return data.map((e) => ({
      id: e.id,
      title: e.title,
      status: e.status_?.name,
    }));
  }, [data]);

  useEffect(() => {
    getData();
  }, [isDeleted]);

  const cols = [
    {
      title: "#",
      dataIndex: "id",
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];


  return (
    <Wrapper title="File" create="/admin/file/create">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        setIsDelete={setIsDeleted}
        del={"/files/deletefiles/"}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Main;
