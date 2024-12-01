import React, { useEffect, useState } from "react";
import useAxios from "./../../../../hooks/useAxios";
import Cookies from "js-cookie";
import DataTable from "../../../components/DataTable";
import Wrapper from "../../../components/Wrapper";

const Menu = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await sendRequest({
          method: "get",
          url: `${import.meta.env.VITE_BASE_URL_API}/menu/getallmenu`,
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        });
        setData(response?.data.sort((a, b) => a.id - b.id));
      } catch (err) {
      }
    };
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Menu" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}/menu/deletemenu`}
        edit={"menu/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          { data: "title", title: "Title" },
          { data: "description", title: "Description" },
          { data: "menu_type_.title", title: "Menu Type" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Menu;
