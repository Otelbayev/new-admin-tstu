import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/wrapper";
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
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const EmployeeType = () => {
  const { loading, sendRequest } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/employeetype/getallemployeetype`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    response.status === 200 &&
      setData(response.data.sort((a, b) => a.id - b.id));
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
    <Wrapper title="Employee Type" create={"/admin/employeetype/create"}>
      <DataTable
        dataSource={dataSource}
        setIsDelete={setIsDelete}
        del={"/employeetype/deleteemployeetype/"}
        loading={loading}
        cols={cols}
      />
    </Wrapper>
  );
};

export default EmployeeType;
