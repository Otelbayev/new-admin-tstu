import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../components/DataTable";
import Wrapper from "../../../components/Wrapper";

const Pages = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/page/getallpage`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      setData(response?.data.sort((a, b) => a.id - b.id));
    } catch (error) {
    }
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Pages" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}/page/deletepage`}
        edit={"pages/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          { data: "title", title: "Title" },
          { data: "title_short", title: "Short Title" },
          { data: "description", title: "Description" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Pages;
