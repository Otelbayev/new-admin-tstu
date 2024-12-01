import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";

const cols = [
  {
    title: "#",
    width: 10,
    dataIndex: "index",
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
];

const Rectorat = () => {
  const [data, setData] = useState([]);
  const { sendRequest, loading } = useAxios();

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/rectoratupdated/getbyrectoratdata`,
      headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
    });

    res.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, []);

  const dataSource = useMemo(() => {
    return data.map((item, index) => ({
      id: item.id,
      index: index + 1,
      name: `${item?.persons_?.lastName} ${item?.persons_?.firstName} ${item?.persons_?.fathers_name}`,
      type: item.persons_.employee_type_.title,
    }));
  }, [data]);

  return (
    <Wrapper title="Rektorat">
      <DataTable dataSource={dataSource} loading={loading} cols={cols} />
    </Wrapper>
  );
};

export default Rectorat;
