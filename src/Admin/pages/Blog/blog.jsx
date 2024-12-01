import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Button, message, Popconfirm } from "antd";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { useBlogCacheContext } from "../../context/BlogCacheContext";
import { useTranslation } from "react-i18next";

const role = Cookies.get("role");

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
    title: "Category",
    dataIndex: "blog_category",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
];

const Blog = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  const { blogCache, setBlogCache } = useBlogCacheContext();
  const { i18n } = useTranslation();

  const defaultStartDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");

  function filterData(type) {
    const obj = {
      events: ["Kutilayotgan tadbirlar"],
      news: [
        "Yangiliklar",
        "Xalqaro aloqalar",
        "Xalqaro hamkorlik",
        "Ilm-fan",
        "Dissertatsiya ishi muhokamasi",
        "Seminar-trening",
        "Ta‘lim",
        "Jamiyat",
        "Tadbirlar",
        "Ma‘naviyat",
        "Qabul",
        "E'lon",
        "Vebinar",
        "Tanlovlar",
      ],
      blog: [
        "Xalqaro ta’lim dasturlari",
        "O‘quv laboratoriyalari",
        "Interaktiv xizmatlar",
        "Talaba hayoti",
        "OAV biz haqimizda",
      ],
    };

    if (obj[type]) {
      return data
        ?.filter((item) => obj[type].includes(item?.blog_category_?.title))
        ?.sort((a, b) => b.id - a.id);
    }

    return data?.sort((a, b) => b.id - a.id);
  }

  const fdata = filterData(type);

  const dataSource = useMemo(() => {
    return fdata.map((item) => ({
      id: item.id,
      title: item.title,
      blog_category: item.blog_category_.title,
      status: item.status_?.name,
    }));
  }, [fdata]);

  const onFinish = async (values) => {
    const response = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}${
        role === "admin"
          ? "/blogcontroller/getallblog"
          : "/blogcontroller/sitegetallblog"
      }?&start_time=${values?.start_date || defaultStartDate}&end_time=${
        values?.end_date || defaultEndDate
      }`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    if (role === "moderatorcontent") {
      setData(response?.data?.list?.sort((a, b) => a.id - b.id));
      setBlogCache(response?.data?.list);
    } else {
      setData(response?.data.sort((a, b) => a.id - b.id));
      setBlogCache(response?.data);
    }
  };

  useEffect(() => {
    onFinish();
  }, [isDelete]);

  const onDelete = async (id) => {
    const res = await sendRequest({
      method: "delete",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/deleteblog/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (res.status === 200) {
      message.success({ content: "O'chirildi" });
      setIsDelete(!isDelete);
    }
  };

  const cols2 = [
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
      title: "Category",
      dataIndex: "blog_category",
    },
    {
      title: "Tahrirlash",
      dataIndex: "id",
      fixed: "right",
      width: 150,
      render: (id) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            onClick={() => navigate(`/${i18n.language}/admin/blogs/edit/${id}`)}
          >
            <RiEditBoxLine size={20} />
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onDelete(id)}
          >
            <Button type="primary" danger>
              <RiDeleteBin6Line size={20} />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Wrapper
        title={type ? type.toUpperCase() : ""}
        form
        onFinish={onFinish}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        create={`/admin/blogs/create`}
      >
        <DataTable
          dataSource={dataSource}
          loading={loading}
          del={"/blogcontroller/deleteblog/"}
          setIsDelete={setIsDelete}
          cols={role === "admin" ? cols : cols2}
          edit={"/admin/blogs/edit/"}
          noAction={role === "admin" ? false : true}
        />
      </Wrapper>
    </div>
  );
};

export default Blog;
