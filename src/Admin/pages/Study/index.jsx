import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../../../hooks/useAxios";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import DownloadFile from "../../components/file-download";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import { ImEye } from "react-icons/im";
import { Button, Col, Row, Select } from "antd";

const Study = () => {
  const { loading, sendRequest } = useAxios();
  const { old_year, setOldYear } = useDateContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [kaf, setKaf] = useState([]);
  const [fak, setFak] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const kafIdFromUrl = searchParams.get("kafedra_id");
  const fakIdFromUrl = searchParams.get("faculty_id");

  const [kafId, setKafId] = useState(kafIdFromUrl || 0);
  const [fakId, setFakId] = useState(fakIdFromUrl || 0);

  const role = Cookies.get("role");

  const getData = async (old_year, kafId) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getalldocumentteacher110set${
        role === "admin" ? "admin" : "studydepartament"
      }`,
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

  const dataSource = useMemo(() => {
    return data.map((item, index) => ({
      id: item.id,
      index: index + 1,
      name: item.firstName,
      surname: item.lastName,
      father_name: item.fathers_name,
      ball: item.summ_score,
    }));
  }, [data]);

  const cols = [
    {
      title: "#",
      dataIndex: "index",
      width: 10,
    },
    {
      title: "FIO",
      render: function (row) {
        return `${row?.surname} ${row?.name} ${row?.father_name}`;
      },
    },
    {
      title: "Ball",
      dataIndex: "max_score",
    },
    {
      title: "Ko'rish",
      dataIndex: "id",
      render: function (id) {
        return (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(`${id}`)}
            icon={<ImEye />}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash</title>
      </Helmet>
      <Wrapper title="Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash">
        <Row
          justify="space-between"
          align={"middle"}
          style={{ marginBottom: 10 }}
          gutter={[10, 10]}
        >
          <Col xs={24} lg={6}>
            <label htmlFor="old_year">O'quv yili</label>
            <Select
              name="old_year"
              value={old_year}
              options={studyYears}
              label="O'qiv yili"
              className="w-100"
              onChange={(e) => {
                setOldYear(e);
              }}
            />
          </Col>
          <Col xs={24} lg={6}>
            <label htmlFor="group">Fakultetlar</label>
            <Select
              label={"Fakultet"}
              name="group"
              value={fakId}
              onChange={(e) => setFakId(e)}
              options={fak}
              className={"w-100"}
            />
          </Col>
          <Col xs={24} lg={6}>
            <label htmlFor="kaf">Kafedralar</label>
            <Select
              label={"Kafedra"}
              name="kaf"
              className="w-100"
              options={kaf}
              value={kafId}
              onChange={(e) => setKafId(e)}
            />
          </Col>
          <Col xs={24} lg={6} style={{ textAlign: "right" }}>
            <DownloadFile />
          </Col>
        </Row>
        <DataTable
          dataSource={dataSource}
          loading={loading}
          cols={cols}
          noAction={true}
        />
      </Wrapper>
    </div>
  );
};

export default Study;
