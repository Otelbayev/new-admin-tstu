import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../components/data-table";

const cols = [
  { title: "#", width: 10, dataIndex: "id", fixed: "left" },
  { title: "Title", dataIndex: "title" },
];

const Main = () => {
  const [data, setData] = useState([]);
  const { loading, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/interactiveservices/getallinteractiveservices`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  };

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status_.name,
    }));
  }, [data]);

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper create={"/admin/interactive/create"} title="Interactive Services">
      <DataTable
        dataSource={dataSource}
        setIsDelete={setIsDelete}
        loading={loading}
        cols={cols}
        del="/interactiveservices/deleteinteractiveservices/"
      />
    </Wrapper>
  );
};

export default Main;
