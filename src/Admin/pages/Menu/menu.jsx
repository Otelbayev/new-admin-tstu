import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";

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
    title: "Description",
    dataIndex: "desc",
    width: 600,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const Menu = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/menu/getallmenu`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      setData(response?.data.sort((a, b) => a.id - b.id));
    };
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.menu_type_.title,
      desc: item.description,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title="Menu" create="/admin/menu/create">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        cols={cols}
        setIsDelete={setIsDelete}
        del={"/menu/deletemenu/"}
      />
    </Wrapper>
  );
};

export default Menu;
