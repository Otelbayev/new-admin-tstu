import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "./../../../../components/DataTable/index";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../../components/Wrapper";

const Main = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await sendRequest({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL_API}/gender/getallgender`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });

      if (res.status === 200) {
        setData(res?.data.sort((a, b) => a.id - b.id));
      }
    }

    getData();
  }, [isDelete]);

  return (
    <Wrapper title={"Gender"} create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}/gender/deletegender`}
        edit={"gender/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "#" },
          { data: "gender", title: "Gender" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
