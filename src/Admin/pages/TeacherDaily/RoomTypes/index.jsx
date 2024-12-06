import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import axios from "axios";
import Cookies from "js-cookie";

const RoomTypes = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/roomtype/getallroomtype`,
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
          type: e.type,
          status: e.status_.name,
        }));

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
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper title="Room Types" create="/admin/room-types/create">
      <DataTable
        dataSource={data}
        setIsDelete={setIsDelete}
        cols={cols}
        del="/roomtype/deleteroomtype/"
      />
    </Wrapper>
  );
};

export default RoomTypes;
