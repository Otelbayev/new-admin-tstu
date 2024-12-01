import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/wrapper";
import DataTable from "../../../components/DataTable";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";

const Teachers = ({ title, url, edit }) => {
  const { loading, error, sendRequest } = useAxios();
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}${url}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper title={title}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        col={[
          { data: "id", title: "#" },
          {
            data: "persons_",
            title: "FISH",
            render: (data) => {
              return `${data.lastName} ${data.firstName} ${data.fathers_name}`;
            },
          },
        ]}
        appeal={true}
        edit={edit}
      />
    </Wrapper>
  );
};

export default Teachers;
