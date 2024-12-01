import React, { useEffect, useMemo, useState } from "react";
import DataTable from "./../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/wrapper";

const cols = [
  {
    title: "ID",
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
  },
];

const Main = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await sendRequest({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL_API}/gender/getallgender`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });

      if (res.status === 200) {
        setData(res?.data.sort((a, b) => a.id - b.id));
      }
    }

    getData();
  }, [isDelete]);

  console.log(data);

  const dataSource = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      title: item.gender,
      status: item.status_.name,
    }));
  }, [data]);

  return (
    <Wrapper title={"Gender"} create={"/admin/gender/create"}>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        del={`/gender/deletegender/`}
        setIsDelete={setIsDelete}
        cols={cols}
      />
    </Wrapper>
  );
};

export default Main;
