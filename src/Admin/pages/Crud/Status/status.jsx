import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/wrapper";

const cols = [
  {
    title: "#",
    width: 10,
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
];

const SiteType = () => {
  const { sendRequest, loading } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/status/getallstatus`,
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
      name: item.name,
    }));
  }, [data]);

  return (
    <Wrapper title="Status" create={"/admin/status/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={`/status/deletestatus/`}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default SiteType;
