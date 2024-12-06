import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import DataTable from "../../components/data-table";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import { Typography } from "antd";
const { Text } = Typography;

const Additionals = ({ title, get, del, create }) => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}${get}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      setData(response?.data.sort((a, b) => a.id - b.id));
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item, index) => ({
      id: item.id,
      index: index + 1,
      title: item.title,
      description: item.description,
      confirmed: item.confirmed,
      status: item.status_?.name,
    }));
  }, [data]);



  const cols = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "description",
      dataIndex: "description",
    },
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
    <Wrapper title={title} create={create}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={del}
        cols={cols}
        setIsDelete={setIsDelete}
      />
    </Wrapper>
  );
};

export default Additionals;
