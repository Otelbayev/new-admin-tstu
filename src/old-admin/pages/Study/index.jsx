import { useEffect, useState } from "react";
import { Select } from "../../components/Generics";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable";
import useAxios from "../../../hooks/useAxios";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import DownloadFile from "../../components/file-download";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Study = () => {
  const { loading, error, sendRequest } = useAxios();
  const { old_year, setOldYear } = useDateContext();
  const [data, setData] = useState([]);
  const [kaf, setKaf] = useState([]);
  const [fak, setFak] = useState([]);

  // Query params handling
  const [searchParams, setSearchParams] = useSearchParams();
  const kafIdFromUrl = searchParams.get("kafedra_id");
  const fakIdFromUrl = searchParams.get("faculty_id");

  const [kafId, setKafId] = useState(kafIdFromUrl || 0);
  const [fakId, setFakId] = useState(fakIdFromUrl || 0);

  const getData = async (old_year, kafId) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getalldocumentteacher110setstudydepartament`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        oldYear: old_year,
        newYear: Number(old_year) + 1,
        departament_id: kafId,
      },
    });

    if (res.status === 200) {
      setData(res.data);
    }
  };

  const getFak = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/selectedallfaculty`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    if (res.status === 200) {
      const faculties = res.data.map((e) => ({ label: e.title, value: e.id }));
      setFak(faculties);
      setFakId(Number(fakIdFromUrl) || faculties[0].value);
    }
  };

  const getKaf = async (facultyId) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/departament/selectedallfacultydepartament`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        faculty_id: facultyId,
      },
    });
    if (res.status === 200) {
      const kafedras = res.data.map((e) => ({ label: e.title, value: e.id }));
      setKaf(kafedras);
      setKafId(Number(kafIdFromUrl) || kafedras[0]?.value);
    }
  };

  useEffect(() => {
    getFak();
  }, []);

  useEffect(() => {
    if (fakId) {
      getKaf(fakId);
    }
  }, [fakId]);

  useEffect(() => {
    if (kafId) {
      getData(old_year, kafId);
    }
  }, [old_year, kafId]);

  useEffect(() => {
    setSearchParams({ faculty_id: fakId, kafedra_id: kafId });
  }, [fakId, kafId]);
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
                          label={"Fakultet"}
                          value={fakId}
                          onChange={(e) => setFakId(e)}
                          options={fak}
                          className={"w-100"}
                        />
                      </div>
                      <div className="col-md-3">
                        <Select
                          label={"Kafedra"}
                          value={kafId}
                          onChange={(e) => setKafId(e)}
                          options={kaf}
                          className={"w-100"}
                        />
                      </div>
                      <div className="text-right col-md-4">
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
                      edit={"study-department"}
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

export default Study;
