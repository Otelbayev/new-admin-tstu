import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import axios from "axios";
import Cookies from "js-cookie";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/room/getallroom`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      const dataSource = res.data
        .sort((a, b) => a.id - b.id)
        .map((e, index) => ({
          id: e.id,
          index: index + 1,
          number: e.number,
          status: e.status_.name,
          room_type: e.room_type_.type,
        }));
      console.log(res.data);
      setData(dataSource);
    }
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
      title: "Xona raqmi",
      dataIndex: "number",
    },
    {
      title: "Xona Raqami",
      dataIndex: "room_type",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper title="Xonalar" create="/admin/rooms/create">
      <DataTable
        setIsDelete={setIsDelete}
        dataSource={data}
        cols={cols}
        del="/room/deleteroom/"
      />
    </Wrapper>
  );
};

export default Rooms;
