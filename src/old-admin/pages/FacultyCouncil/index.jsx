import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable";
import useAxios from "../../../hooks/useAxios";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import DownloadFile from "./../../components/file-download";
import { Select } from "../../components/Generics";
import { Helmet } from "react-helmet";

const FacultyCouncil = () => {
  const { loading, error, sendRequest } = useAxios();

  const { old_year, setOldYear } = useDateContext();
  const [data, setData] = useState([]);
  const [kaf, setKaf] = useState([]);
  const [kafId, setKafId] = useState(0);

  const getData = async (old_year, kafId) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getalldocumentteacher110setfacultycouncil`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        oldYear: old_year,
        newYear: Number(old_year) + 1,
        departament_id: kafId,
      },
    });

    res.status === 200 && setData(res.data);
  };

  const getKaf = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/selectedallfacultydepartament`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    res.status === 200 &&
      setKaf(res.data.map((e) => ({ label: e.title, value: e.id })));

    setKafId(res.data[0].id);
  };

  useEffect(() => {
    getData(old_year, kafId);
  }, [old_year, kafId]);

  useEffect(() => {
    getKaf();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash</title>
      </Helmet>
      <div className="content-wrapper wrapper-min-height">
        <section className="content pt-5">
          <div className="container-fluid">
            <section className="content-header">
              <h1>Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash</h1>
            </section>
            <section className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <Select
                          value={old_year}
                          options={studyYears}
                          className={"w-100"}
                          label="O'qiv yili"
                          onChange={(e) => {
                            setOldYear(e);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <Select
                          label={"Kafedra"}
                          className={"w-100"}
                          options={kaf}
                          value={kafId}
                          onChange={(e) => setKafId(e)}
                        />
                      </div>
                      <div className="text-right col-md-7">
                        <DownloadFile />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <DataTable
                      data={data}
                      loading={loading}
                      error={error}
                      col={[
                        { data: "id", title: "# " },
                        {
                          title: "FISH",
                          render: function (data, type, row) {
                            return `${row?.firstName} ${row?.fathers_name}`;
                          },
                        },
                        { data: "summ_score", title: "Ball" },
                      ]}
                      appeal={true}
                      edit={"faculty-council"}
                    />
                  </div>
                  <div className="card-footer clearfix">
                    <ul className="pagination pagination-sm m-0 float-right"></ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FacultyCouncil;
