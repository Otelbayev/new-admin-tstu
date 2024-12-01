import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";

const cols = [
  { title: "#", width: 10, dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Surname", dataIndex: "surname" },
  { title: "Fathers Name", dataIndex: "fathers_name" },
  { title: "Department", dataIndex: "department" },
  { title: "Type", dataIndex: "type" },
  { title: "Status", dataIndex: "status" },
];

const Empoyee = () => {
  const { sendRequest, loading } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/persondata/getallpersondata`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    res.status === 200 && setData(res?.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      name: item.persons_.firstName,
      surname: item.persons_.lastName,
      fathers_name: item.persons_.fathers_name,
      department: item.persons_.departament_.title,
      type: item.persons_.employee_type_.title,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title="Employee" create="/admin/employee/create">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={"/persondata/deletepersondata/"}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Empoyee;
