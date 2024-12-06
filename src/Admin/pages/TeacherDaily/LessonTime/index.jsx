import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import axios from "axios";
import Cookies from "js-cookie";

const index = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/lessontime/getalllessontime`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    const dataSource = res.data
      .sort((a, b) => a.id - b.id)
      .map((e, index) => ({
        id: e.id,
        index: index + 1,
        start_time: e.start_time,
        end_time: e.end_time,
        lesson_plan: e.lesson_plan,
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
      title: "Dars",
      render: (data) => {
        return `${data.lesson_plan} - dars`;
      },
    },
    {
      title: "Vaqti",
      render: (data) => {
        return `${data.start_time} - ${data.end_time}`;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper title={"Dars soati"} create="/admin/lesson-time/create">
      <DataTable
        dataSource={data}
        cols={cols}
        del="/lessontime/deletelessontime/"
        setIsDelete={setIsDelete}
      />
    </Wrapper>
  );
};

export default index;
