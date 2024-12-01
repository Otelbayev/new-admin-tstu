import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "./../../../components/DataTable/index";
import Wrapper from "../../../components/Wrapper";

const Main = () => {
  const { loading, error, sendRequest } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/site/getallsite`,
      headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
    });
    if (res.status === 200) {
      setData(res?.data.sort((a, b) => a.id - b.id));
    }
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Site" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        setIsDelete={setIsDelete}
        del={`${import.meta.env.VITE_BASE_URL_API}/site/deletesite`}
        edit={"site/edit"}
        col={[
          { data: "id", title: "#" },
          { data: "title", title: "Title" },
          { data: "description", title: "Description" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
