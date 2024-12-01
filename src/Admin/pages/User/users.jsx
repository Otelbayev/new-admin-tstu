import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../components/data-table";
import Wrapper from "../../components/wrapper";

const cols = [
  {
    title: "#",
    width: 10,
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "Login",
    dataIndex: "login",
  },
  {
    title: "User type",
    dataIndex: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const Users = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      mathod: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/usercrud/getalluser`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res?.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      login: item.login,
      type: item.user_type_.type,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title="Users" create={"/admin/users/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={"/usercrud/deleteuser/"}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Users;
