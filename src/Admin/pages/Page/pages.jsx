import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { usePageCacheContext } from "../../context/PageCacheContext";

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
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const Pages = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const { setPageCache } = usePageCacheContext();

  const getData = async () => {
    const response = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/page/getallpage`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (response.status === 200) {
      setData(response?.data.sort((a, b) => a.id - b.id));
      setPageCache(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title="Sahifalar" create={"/admin/pages/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        cols={cols}
        del={"/page/deletepage/"}
        setIsDelete={setIsDelete}
      />
    </Wrapper>
  );
};

export default Pages;
