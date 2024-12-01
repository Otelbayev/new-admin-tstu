import React, { useEffect, useState } from "react";
import Wrapper from "./../../../components/Wrapper";
import Cookies from "js-cookie";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "../../../components/DataTable";

const Main = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      mathod: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/usercrud/getalluser`,
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
    <Wrapper title="Users" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        setIsDelete={setIsDelete}
        del={`${import.meta.env.VITE_BASE_URL_API}/usercrud/deleteuser`}
        edit={"users/edit"}
        col={[
          {
            data: "id",
            title: "#",
          },
          {
            data: "login",
            title: "Login",
          },
          {
            data: "user_type_.type",
            title: "User Type",
          },
          {
            data: "status_.status",
            title: "Status",
          },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
