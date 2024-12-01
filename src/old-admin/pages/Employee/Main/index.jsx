import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { i18n } = useTranslation();
  const { sendRequest, loading, error } = useAxios();
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/persondata/getallpersondata`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    res.status === 200 && setData(res?.data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper
      title="Employee"
      create={true}
      path={`/${i18n.language}/admin/employee/create`}
    >
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}/persondata/deletepersondata`}
        edit={"employee/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          {
            data: null,
            title: "FISH",
            render: function (data, type, row) {
              return `${row.persons_?.firstName} ${row.persons_?.lastName} ${row.persons_?.fathers_name}`;
            },
          },
          {
            data: "persons_.departament_.title",
            title: "Bo'lim",
          },
          { data: "persons_.employee_type_.title", title: "Xodim" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default Main;
