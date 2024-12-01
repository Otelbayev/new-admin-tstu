import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";

const cols = [
  {
    id: "#",
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

const DepartmentType = () => {
  const { sendRequest, loading } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/deartamenttypecontroller/getalldepartamentType`,
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
    <Wrapper title="Department Type" create={"/admin/departmenttype/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={"/deartamenttypecontroller/deletedepartamentType/"}
        cols={cols}
        setIsDelete={setIsDelete}
      />
    </Wrapper>
  );
};

export default DepartmentType;
