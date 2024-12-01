import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "../../../components/DataTable";
import Cookies from "js-cookie";

const Main = () => {
  const [data, setData] = useState([]);
  const { error, loading, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/interactiveservices/getallinteractiveservices`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper create={true} title="Interactive Services">
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/interactiveservices/deleteinteractiveservices`
        }
        edit={"interactive/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "#" },
          { data: "title", title: "Title" },
          {
            data: "description",
            title: "Description",
          },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
