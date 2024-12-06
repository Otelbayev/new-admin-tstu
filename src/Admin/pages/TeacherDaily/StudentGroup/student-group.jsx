import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/data-table";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { Button, Flex, Popconfirm } from "antd";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const EduLang = () => {
  const { loading, sendRequest } = useAxios();
  const [isDeleted, setIsDeleted] = useState("");
  const [data, setData] = useState([]);
  const role = Cookies.get("role");

  const getData = async () => {
    const res = await sendRequest({
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/studentgroup/getallstudentgroup${role !== "admin" ? "faculty" : ""}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    const dataSource = res?.data
      ?.sort((a, b) => a.id - b.id)
      ?.map((e, index) => ({
        id: e.id,
        index: index + 1,
        title: e.name,
        status: e.status_?.name,
        from: e.year_of_adoption || "",
        department: e.departament_.title,
        to: e.graduation_year || "",
        type: e.learning_form_.title,
        lang: e.education_language_.title,
      }));

    console.log(res.data);

    setData(dataSource);
  };

  useEffect(() => {
    getData();
  }, [isDeleted]);

  const onDel = async (id) => {
    const res = await axios.delete(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/studentgroup/deletestudentgroupfaculty/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    res.status === 200 && getData();
  };

  const cols = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nomi",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Bo'lim",
      dataIndex: "department",
    },
    {
      title: "Yil",
      render: (data) => {
        return `${data.from} - ${data.to}`;
      },
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "id",
    },
  ];

  const colsfak = [
    {
      title: "#",
      dataIndex: "index",
      key: "id",
    },

    {
      title: "Nomi",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Ta'lim shakli",
      dataIndex: "type",
    },
    {
      title: "O'quv tili",
      dataIndex: "lang",
    },
    {
      title: "Yil",
      render: (data) => {
        return `${data.from} - ${data.to}`;
      },
    },
    {
      title: "Tahrirlash",
      align: "right",
      width: 15,
      render: (data) => {
        return (
          <Flex gap="5px">
            <Link to={`edit/${data.id}`}>
              <Button size="large" icon={<FiEdit />} type="primary" />
            </Link>

            <Popconfirm
              title="Tasdiqlash"
              description="O'chirishni tasdiqlaysizmi?"
              onConfirm={() => onDel(data.id)}
              okText="Ha"
              cancelText="Yoq"
            >
              <Button size="large" icon={<FiTrash />} type="primary" danger />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <Wrapper title="Gruh" create="/admin/student-group/create">
      <DataTable
        dataSource={data}
        setIsDelete={setIsDeleted}
        loading={loading}
        del="/studentgroup/deletestudentgroup/"
        cols={role == "admin" ? cols : colsfak}
        noAction={role !== "admin"}
      />
    </Wrapper>
  );
};

export default EduLang;
