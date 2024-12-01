import React, { useEffect, useMemo, useState } from "react";
import DataTable from "./../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/wrapper";

const Main = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await sendRequest({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL_API}/territorie/getallterritorie`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });

      if (res.status === 200) {
        setData(res?.data.sort((a, b) => a.id - b.id));
      }
    }

    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item, index) => ({
      key: index,
      id: item.id,
      title: item.title,
      status: item.status_.name,
    }));
  }, [data]);

  const cols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Wrapper title="Regions" create={"/admin/region/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={`/territorie/deleteterritorie/`}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Main;
