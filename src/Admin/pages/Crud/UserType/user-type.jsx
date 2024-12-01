import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../components/data-table";
import Wrapper from "../../../components/wrapper";

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

const UserType = () => {
  const { sendRequest, loading, error } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/usertype/getallusertype`,
      headers: {
        Authorization: token,
      },
    });
    response.status === 200 &&
      setData(response?.data?.sort((b, a) => b.id - a.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.type,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper create={"/admin/usertype/create"} title="User Type">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        cols={cols}
        setIsDelete={setIsDelete}
        del={"/usertype/deleteusertype/"}
      />
    </Wrapper>
  );
};

export default UserType;
