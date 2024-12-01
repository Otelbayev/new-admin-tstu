import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../../../hooks/useAxios";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import DownloadFile from "./../../components/file-download";
import { Helmet } from "react-helmet";
import Wrapper from "../../components/wrapper";
import DataTable from "../../components/data-table";
import { ImEye } from "react-icons/im";
import { Button, Col, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";

const cols = [
  {
    title: "#",
    width: 10,
    dataIndex: "index",
  },
  {
    title: "FIO",
    dataIndex: "fio",
  },
  {
    title: "Ball",
    dataIndex: "max_score",
  },
  {
    title: "Ko'rish",
    fixed: "right",
    render: (e) => (
      <Link to={`${e.id}`}>
        <Button type="primary">
          <ImEye />
        </Button>
      </Link>
    ),
  },
];

const FacultyCouncil = () => {
  const url = new URLSearchParams(window.location.search);

  const { loading, sendRequest } = useAxios();
  const navigate = useNavigate();

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

    url.get("kafedra_id")
      ? setKafId(Number(url.get("kafedra_id")))
      : setKafId(res.data[0]?.id);
  };

  useEffect(() => {
    getData(old_year, kafId);
  }, [old_year, kafId]);

  useEffect(() => {
    if (url.get("kafedra_id")) getData(old_year, url.get("kafedra_id"));
  }, [url.get("kafedra_id")]);

  useEffect(() => {
    getKaf();
  }, []);

  const dataSource = useMemo(() => {
    return data.map((item, index) => ({
      id: item.id,
      index: index + 1,
      fio: `${item.lastName} ${item.firstName} ${item.fathers_name}`,
      max_score: item.summ_score,
    }));
  }, [data]);

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
          <Col xs={24} lg={8}>
            <label htmlFor="year">O'qiv yili</label>
            <Select
              value={old_year}
              id="year"
              options={studyYears}
              label="O'qiv yili"
              className="w-100"
              onChange={(e) => {
                setOldYear(e);
              }}
            />
          </Col>
          <Col xs={24} lg={8}>
            <label htmlFor="kaf">Kafedralar</label>
            <Select
              label={"Kafedra"}
              className="w-100"
              id="kaf"
              options={kaf}
              value={kafId}
              onChange={(e) => {
                setKafId(e);
                url.set("kafedra_id", e);
                navigate(`?kafedra_id=${e}`);
              }}
            />
          </Col>
          <Col xs={24} lg={8} style={{ textAlign: "right" }}>
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

export default FacultyCouncil;
