import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../../components/Wrapper";

const Main = () => {
  const { loading, error, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState();

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/sitedetail/getallsitedetail`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    res?.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Site Details" create={true}>
      <DataTable
        loading={loading}
        error={error}
        setIsDelete={setIsDelete}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/sitedetail/deletesitedetail/`
        }
        edit={"site-details/edit"}
        data={data}
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
