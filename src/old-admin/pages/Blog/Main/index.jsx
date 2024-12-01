import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "../../../components/DataTable";
import Wrapper from "../../../components/Wrapper";
import Cookies from "js-cookie";

const Pages = () => {
  const role = Cookies.get("role");

  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const { type } = useParams();

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

  return (
    <Wrapper
      title={`${type[0].toUpperCase()}${type.slice(1)}`}
      date={true}
      create={true}
      setData={setData}
      sendRequest={sendRequest}
      isDelete={isDelete}
      url={
        role === "admin"
          ? "/blogcontroller/getallblog"
          : "/blogcontroller/sitegetallblog"
      }
    >
      <DataTable
        data={fdata}
        error={error}
        loading={loading}
        del={`${import.meta.env.VITE_BASE_URL_API}/blogcontroller/deleteblog`}
        edit={"blogs/edit"}
        setIsDelete={setIsDelete}
        col={
          role === "admin"
            ? [
                { data: "id", title: "# " },
                { data: "title", title: "Title" },
                { data: "title_short", title: "Short Title" },
                { data: "blog_category_.title", title: "Katigoriya" },
                { data: "status_.status", title: "Status" },
              ]
            : [
                { data: "id", title: "# " },
                { data: "title", title: "Title" },
                { data: "title_short", title: "Short Title" },
                { data: "blog_category_.title", title: "Katigoriya" },
              ]
        }
      />
    </Wrapper>
  );
};

export default Pages;
