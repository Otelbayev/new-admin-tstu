import React, { useState } from "react";
import useAxios from "./../../../hooks/useAxios";
import DataTable from "../../components/DataTable";
import Wrapper from "../../components/Wrapper";

const Appeals = () => {
  const { sendRequest, error, loading } = useAxios();
  const [data, setData] = useState([]);



  return (
    <Wrapper
      create={false}
      date={true}
      setData={setData}
      sendRequest={sendRequest}
      isDelete={""}
      url="/appealtorector/getallappealtorector"
      title="Murojaatlar"
    >
      <DataTable
        data={data}
        error={error}
        loading={loading}
        appeal={true}
        edit={"appeals"}
        col={[
          { data: "id", title: "# " },
          { data: "fio_", title: "FISH" },
          { data: "email", title: "Email" },
          { data: "telephone_number_one", title: "Telefon" },
          { data: "country_.title", title: "Mamlakat" },
          {
            data: null,
            title: "Sana",
            render: function (data, type, row) {
              return row?.created_at?.slice(0, 10);
            },
          },
          {
            data: null,
            title: "Status",
            render: function (data, type, row) {
              return row?.confirm ? "Tasdiqlangan" : "Yangi";
            },
          },
        ]}
      />
    </Wrapper>
  );
};

export default Appeals;
