import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import axios from "axios";
import Cookies from "js-cookie";

const AcademiSubject = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/academicsubject/getallacademicsubject`,
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
          name: e.name,
          status: e.status_.name,
          type: e.audience_type === "Audience" ? "Maruza" : "Amaliyot",
          department: e.departament_?.title,
          lang: e.education_language_?.title,
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
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Fan turi",
      dataIndex: "type",
    },
    {
      title: "Bo'lim",
      dataIndex: "department",
    },
    {
      title: "Ta'lim tili",
      dataIndex: "lang",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Wrapper create="/admin/academi-subject/create" title="Fanlar">
      <DataTable
        setIsDelete={setIsDelete}
        dataSource={data}
        cols={cols}
        del="/academicsubject/deleteacademicsubject/"
      />
    </Wrapper>
  );
};

export default AcademiSubject;
