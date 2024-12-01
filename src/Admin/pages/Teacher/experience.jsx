import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";

const Experiance = () => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/personscientificactivity/getallpersonscientificactivityprofil`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      setData(response?.data.sort((a, b) => a.id - b.id));
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Tadjriba" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${
          import.meta.env.VITE_BASE_URL_API
        }/personscientificactivity/deletepersonscientificactivity`}
        edit={"experience/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          {
            data: null,
            title: "Sana",
            render: function (data) {
              return `${data.since_when} - ${data.until_when}`;
            },
          },
          { data: "whom", title: "Lavozim" },
          { data: "where", title: "Qayerda" },
          {
            data: "confirmed",
            title: "Status",
            render: (data) => {
              const obj = {
                0: "<div class='text-primary'>Jarayonda</div>",
                1: "<div class='text-success'>Tasdiqlangan </div>",
                2: "<div class='text-danger'>Rad etilgan </div>",
              };

              return obj[data];
            },
          },
        ]}
      />
    </Wrapper>
  );
};

export default Experiance;
