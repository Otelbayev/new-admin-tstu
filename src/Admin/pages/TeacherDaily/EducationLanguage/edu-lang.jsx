import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";

const EduLang = () => {
  const { loading, sendRequest } = useAxios();
  const [isDeleted, setIsDeleted] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/educationlanguage/getalleducationlanguage`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    const dataSource = res?.data
      ?.sort((a, b) => a.id - b.id)
      ?.map((e) => ({
        id: e.id,
        title: e.title,
        status: e.status_?.name,
      }));

    setData(dataSource);
  };

  useEffect(() => {
    getData();
  }, [isDeleted]);

  const cols = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
    },
  ];

  return (
    <Wrapper
      title="Education Language"
      create="/admin/edu-lang/create"
     
    >
      <DataTable
        dataSource={data}
        setIsDelete={setIsDeleted}
        loading={loading}
        del="/educationlanguage/deleteeducationlanguage/"
        cols={cols}
      />
    </Wrapper>
  );
};

export default EduLang;
