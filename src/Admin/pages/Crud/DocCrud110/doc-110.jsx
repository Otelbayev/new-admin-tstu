import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "../../../components/data-table";
import Cookies from "js-cookie";

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
    title: "Max Score",
    dataIndex: "max_score",
  },
];

const Doc110 = () => {
  const [data, setData] = useState([]);

  const { loading, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);

  async function getData() {
    const res = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110controller/getalldocumentteacher110admin`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  }

  useEffect(() => {
    getData();
  }, [isDelete]);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      max_score: item.max_score,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title="110 ball kriteriyalar" create="/admin/crud-110/create">
      <DataTable
        dataSource={dataSource}
        loading={loading}
        setIsDelete={setIsDelete}
        cols={cols}
        del={`/documentteacher110controller/deletedocumentteacher110/`}
      />
    </Wrapper>
  );
};

export default Doc110;
