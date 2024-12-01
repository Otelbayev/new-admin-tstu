import { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDateContext } from "../../../context/DateContext";
import DataTable from "../../../components/DataTable";

const AllTeacherID = () => {
  const { loading, error, sendRequest } = useAxios();
  const { id } = useParams();
  const { old_year } = useDateContext();

  const [data, setDate] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getdocumentteacher110setadmin`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        oldYear: old_year,
        newYear: Number(old_year) + 1,
        person_id: id,
      },
    });

    res.status === 200 && setDate(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper
      title={`${data.person_?.lastName} ${data.person_?.firstName} ${data.person_?.fathers_name}`}
    >
      <DataTable
        data={data?.documents_teacher_}
        loading={loading}
        error={error}
        col={[
          { data: "id", title: "#" },
          { data: "comment", title: "title" },
          { data: "document_.title", title: "Document" },
          {
            render: function (data, type, row) {
              return `${row.score ? row.score : 0} / ${
                row.document_?.max_score
              }`;
            },
            title: "Ball",
          },
        ]}
      />
    </Wrapper>
  );
};

export default AllTeacherID;
