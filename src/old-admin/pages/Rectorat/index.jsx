import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import DataTable from "../../components/DataTable";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";

const Rectorat = () => {
  const [data, setData] = useState([]);
  const { sendRequest, loading, error } = useAxios();

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/rectoratupdated/getbyrectoratdata`,
      headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
    });

    res.status === 200 && setData(res.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper title="Rektorat">
      <DataTable
        data={data}
        loading={loading}
        error={error}
        edit={"rectorat/edit"}
        appeal={true}
        col={[
          { data: "id", title: "# " },
          {
            title: "FISH",
            render: function (data, type, row) {
              return `${row?.persons_?.firstName} ${row?.persons_?.fathers_name}`;
            },
          },
          {
            data: "persons_.employee_type_.title",
            title: "Unvon",
          },
        ]}
      />
    </Wrapper>
  );
};

export default Rectorat;
