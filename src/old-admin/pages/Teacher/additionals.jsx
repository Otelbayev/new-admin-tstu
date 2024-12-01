import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable";
import Wrapper from "../../components/Wrapper";
import useAxios from "../../../hooks/useAxios";

const Additionals = ({ title, get, del, edit }) => {
  const { sendRequest, loading, error } = useAxios();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}${get}`,
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
    <Wrapper title={title} create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}${del}`}
        edit={edit}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          { data: "title", title: "Mavzu" },
          { data: "description", title: "Izoh" },
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

export default Additionals;
