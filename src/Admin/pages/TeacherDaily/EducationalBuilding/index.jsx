import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import axios from "axios";
import Cookies from "js-cookie";

const EducationBulding = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/educationalbuilding/getalleducationalbuilding`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    const dataSource = res.data
      .sort((a, b) => a.id - b.id)
      .map((e, index) => ({
        index: index + 1,
        id: e.id,
        name: e.name,
        desc: e.description,
        status: e.status_?.name,
      }));

    setData(dataSource);
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  const cols = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Izoh",
      dataIndex: "desc",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper title="Education Building" create="/admin/edu-build/create">
      <DataTable
        dataSource={data}
        cols={cols}
        del="/educationalbuilding/deleteeducationalbuilding/"
        setIsDelete={setIsDelete}
      />
    </Wrapper>
  );
};

export default EducationBulding;
