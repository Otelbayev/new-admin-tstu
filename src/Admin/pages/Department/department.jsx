import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

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
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Description",
    dataIndex: "desc",
    width: 600,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];
const Department = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const param = useParams();

  const type = param?.type
    ? `${param.type[0].toUpperCase()}${param.type.slice(1)}`
    : "";

  useEffect(() => {
    async function fetchData() {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/departament/getalldepartamenttype/${type}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      response.status === 200 &&
        setData(response.data?.sort((a, b) => a.id - b.id));
    }
    fetchData();
  }, [isDelete, type]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.departament_type_.type,
      desc: item.description,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper
      title={param.type.toUpperCase()}
      create="/admin/department/create"
    >
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={"/departament/deletedepartament/"}
        setIsDelete={setIsDelete}
        cols={cols}
        edit={"/admin/department/edit/"}
      />
    </Wrapper>
  );
};

export default Department;
