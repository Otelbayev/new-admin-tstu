import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import useAxios from "../../../../hooks/useAxios";
import DataTable from "../../../components/DataTable";
import Cookies from "js-cookie";

const Crud110 = () => {
  const [data, setData] = useState([]);

  const { loading, error, sendRequest } = useAxios();
  const [isDelete, setIsDelete] = useState(false);

  async function getData() {
    const res = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110controller/getalldocumentteacher110admin`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  }

  useEffect(() => {
    getData();
  }, [isDelete]);
  return (
    <Wrapper
      create="true"
      title="Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash"
    >
      <DataTable
        data={data}
        loading={loading}
        error={error}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "#" },
          { data: "title", title: "title" },
          { data: "max_score", title: "Ball" },
        ]}
        edit="crud-110/edit"
        del={`${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110controller/deletedocumentteacher110`}
      />
    </Wrapper>
  );
};

export default Crud110;
