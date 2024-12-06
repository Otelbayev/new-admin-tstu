import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import DataTable from "../../components/data-table";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import { Typography } from "antd";
const { Text } = Typography;

const Experiance = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/personscientificactivity/getallpersonscientificactivityprofil`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    setData(response?.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((e, index) => ({
      id: e.id,
      index: index + 1,
      from: e.since_when,
      to: e.until_when,
      whom: e.whom,
      where: e.where,
      confirmed: e.confirmed,
      status: e.status_?.name,
    }));
  }, [data]);

  const cols = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Sana",
      render: function (data) {
        return `${data.from} - ${data.to}`;
      },
    },
    { dataIndex: "whom", title: "Lavozim" },
    { dataIndex: "where", title: "Qayerda" },
    {
      title: "Status",
      render: (data) => {
        const obj = {
          0: <Text>Jarayonda</Text>,
          1: <Text type="success">Tasdiqlangan</Text>,
          2: <Text type="danger">Rad etilgan</Text>,
        };

        return obj[data.confirmed];
      },
    },
  ];

  return (
    <Wrapper title="Tadjriba" create={"/admin/experience/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={`/personscientificactivity/deletepersonscientificactivity/`}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Experiance;
