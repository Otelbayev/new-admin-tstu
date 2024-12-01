import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
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
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const MenuType = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/menutype/getallmenutype`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    response.status === 200 &&
      setData(response?.data.sort((b, a) => b.id - a.id));
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
    <Wrapper title="Menu Type" create="/admin/menutype/create">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        setIsDelete={setIsDelete}
        cols={cols}
        del={"/menutype/deletemenutype/"}
      />
    </Wrapper>
  );
};

export default MenuType;
