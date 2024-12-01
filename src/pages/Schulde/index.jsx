import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UniShowcase from "../../components/UniShowcase";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Select } from "antd";
import { bino, kesim, season, semestr } from "./mock";
import { useSchuldeContext } from "../../context/SchuldeContext";
import ScheduleContent from "./schedule-content";
import { getDepartment } from "./department";
import { RiAiGenerate } from "react-icons/ri";
import axios from "axios";

const filterOption = (input, option) =>
  option.label?.toLowerCase().includes(input?.toLowerCase());

const Schulde = () => {
  const { t } = useTranslation();
  const { schulde, setSchulde } = useSchuldeContext();
  const [loading, setLoading] = useState(false);
  const token = import.meta.env.VITE_CAPCHA_TOKEN;

  const [data, setData] = useState([]);

  const [buildingType, setBuildingType] = useState("1");
  const [semestrValue, setSemestrValue] = useState("17");
  const [yearValue, setYearValue] = useState("2024");

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [facultyValue, setFacultyValue] = useState(6);

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentValue, setDepartmentValue] = useState(null);
  const [depLoading, setDepLoading] = useState(false);

  const [groupOptions, setGroupOptions] = useState([]);
  const [groupValue, setGroupValue] = useState(881);
  const [groupLoading, setGroupLoading] = useState(false);

  const [teacherOptions, setTeacherOptions] = useState([]);
  const [teacherValue, setTeacherValue] = useState(null);
  const [teacherLoading, setTeacherLoading] = useState(false);

  const [roomOptions, setRoomOptions] = useState([]);
  const [roomValue, setRoomValue] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);

  const getFaculties = async () => {
    const res = await getDepartment(11);
    if (res.success) {
      const faculties = res.data?.items?.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFacultyOptions(
        faculties?.sort((a, b) => a.label.localeCompare(b.label))
      );
    }
  };

  const getDepartments = async (parent) => {
    setDepLoading(true);
    const res = await getDepartment(12, parent);

    if (res.success) {
      const departments = res.data?.items?.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartmentOptions(
        departments?.sort((a, b) => a.label.localeCompare(b.label))
      );
      setDepLoading(false);
      setDepartmentValue(departments[0]?.value);
    }
  };

  const getGroups = async (_department) => {
    setGroupLoading(true);
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/hemisapicontroller/data/groups-list?limit=200&_department=${_department}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      const groups = data.data?.items?.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setGroupOptions(groups?.sort((a, b) => a.label.localeCompare(b.label)));
      setGroupLoading(false);
    }
  };

  const getTeachers = async (_department) => {
    setTeacherLoading(true);
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/hemisapicontroller/data/employees-list?limit=200&type=teacher&_department=${_department}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      const uniqueArray = [
        ...new Map(data.data?.items?.map((item) => [item.id, item])).values(),
      ];

      const teachers = uniqueArray?.map((item) => ({
        value: item.id,
        label: item.short_name,
      }));

      setTeacherOptions(
        teachers?.sort((a, b) => a.label.localeCompare(b.label))
      );
      setTeacherLoading(false);
      setTeacherValue(teachers[0]?.value);
    }
  };

  const getRooms = async (_building) => {
    setRoomLoading(true);
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/hemisapicontroller/data/auditoriums-list?limit=200&_building=${_building}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      const rooms = data.data?.items?.map((item) => ({
        value: item.code,
        label: item.name,
      }));
      setRoomOptions(rooms?.sort((a, b) => a.label.localeCompare(b.label)));
      setRoomLoading(false);
      setRoomValue(rooms[0]?.value);
    }
  };

  const getSchedule = async (
    _faculty,
    _department,
    _group,
    _semester,
    _education_year,
    _employee,
    _auditorium
  ) => {
    const param0 = {
      limit: 200,
      _faculty,
      _group,
      _semester,
      _education_year,
    };

    const param1 = {
      limit: 200,
      _faculty,
      _department,
      _employee,
      _education_year,
    };

    const param2 = {
      limit: 200,
      _auditorium,
      _education_year,
    };

    setLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/
hemisapicontroller/data/schedules-list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: schulde === "0" ? param0 : schulde === "1" ? param1 : param2,
      }
    );

    if (res.status === 200) {
      setLoading(false);
      setData(res.data?.data?.items);
    }
  };

  useEffect(() => {
    getFaculties();
  }, []);

  useEffect(() => {
    if (facultyValue) {
      getDepartments(facultyValue);
      getGroups(facultyValue);
    }
  }, [facultyValue]);

  useEffect(() => {
    if (departmentValue && schulde === "1") {
      getTeachers(departmentValue);
    }
  }, [departmentValue, schulde]);

  useEffect(() => {
    if (schulde === "2") {
      getRooms(buildingType);
    }
  }, [buildingType, schulde]);

  useEffect(() => {
    getSchedule(
      facultyValue,
      departmentValue,
      groupValue,
      semestrValue,
      yearValue,
      teacherValue,
      roomValue
    );
  }, [schulde]);

  const onGenerate = () =>
    getSchedule(
      facultyValue,
      departmentValue,
      groupValue,
      semestrValue,
      yearValue,
      teacherValue,
      roomValue
    );

  return (
    <div>
      <Helmet>
        <title>{t("interactive.schulde")}</title>
      </Helmet>
      <UniShowcase title={t("interactive.schulde")} />
      <div className="root-container">
        <div className="root-wrapper">
          <Row
            gutter={[5, 15]}
            md={12}
            xs={24}
            style={{ padding: "10px", marginTop: "15px" }}
          >
            <Col lg={4} md={12} xs={24}>
              <label style={{ display: "block" }} htmlFor="fir">
                Kesimni tanlash
              </label>
              <Select
                size="large"
                id="fir"
                options={kesim}
                style={{ width: "100%" }}
                defaultValue={"0"}
                onChange={(value) => setSchulde(value)}
              />
            </Col>
            {(schulde === "0" || schulde === "1") && (
              <Col lg={schulde === "0" ? 7 : 5} md={12} xs={24}>
                <label style={{ display: "block" }} htmlFor="fir">
                  Fakultet
                </label>
                <Select
                  size="large"
                  id="fak"
                  style={{ width: "100%" }}
                  options={facultyOptions}
                  value={
                    facultyValue || { value: "0", label: "Yuklanmoqda..." }
                  }
                  onChange={(value) => {
                    setFacultyValue(value);
                  }}
                  optionFilterProp="label"
                  showSearch
                  filterOption={filterOption}
                />
              </Col>
            )}

            {schulde === "2" && (
              <>
                <Col lg={4} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="bino">
                    Bino
                  </label>
                  <Select
                    size="large"
                    id="bino"
                    style={{ width: "100%" }}
                    options={bino}
                    optionFilterProp="label"
                    showSearch
                    filterOption={filterOption}
                    value={buildingType}
                    onChange={(value) => setBuildingType(value)}
                  />
                </Col>
                <Col lg={4} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="xona">
                    Xona
                  </label>
                  <Select
                    size="large"
                    id="xona"
                    style={{ width: "100%" }}
                    options={roomOptions}
                    showSearch
                    filterOption={filterOption}
                    value={
                      roomLoading
                        ? {
                            value: "0",
                            label: "Yuklanmoqda...",
                          }
                        : roomValue || {
                            value: "0",
                            label: "Ma'lumot topilmadi",
                          }
                    }
                    onChange={(value) => setRoomValue(value)}
                  />
                </Col>
              </>
            )}

            {schulde === "1" && (
              <>
                <Col lg={5} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="kaf">
                    Kafedralar
                  </label>
                  <Select
                    size="large"
                    id="kaf"
                    style={{ width: "100%" }}
                    options={departmentOptions}
                    value={
                      depLoading
                        ? {
                            value: "0",
                            label: "Yuklanmoqda...",
                          }
                        : departmentValue || {
                            value: "0",
                            label: "Ma'lumot topilmadi",
                          }
                    }
                    onChange={(value) => setDepartmentValue(value)}
                    optionFilterProp="label"
                    showSearch
                    filterOption={filterOption}
                  />
                </Col>
                <Col lg={4} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="teacher">
                    O'qituvchilar
                  </label>
                  <Select
                    size="large"
                    id="teacher"
                    style={{ width: "100%" }}
                    options={teacherOptions}
                    showSearch
                    filterOption={filterOption}
                    value={
                      teacherLoading
                        ? {
                            value: "0",
                            label: "Yuklanmoqda...",
                          }
                        : teacherValue || {
                            value: "0",
                            label: "Ma'lumot topilmadi",
                          }
                    }
                    onChange={(value) => setTeacherValue(value)}
                  />
                </Col>
              </>
            )}

            <Col lg={3} md={12} xs={24}>
              <label style={{ display: "block" }} htmlFor="year">
                O'quv yili
              </label>
              <Select
                size="large"
                id="year"
                options={season}
                style={{ width: "100%" }}
                value={yearValue}
                onChange={(value) => setYearValue(value)}
                showSearch
                filterOption={filterOption}
              />
            </Col>

            {schulde === "0" && (
              <>
                <Col lg={3} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="group">
                    Gruh
                  </label>
                  <Select
                    size="large"
                    id="group"
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    showSearch
                    filterOption={filterOption}
                    options={groupOptions}
                    value={
                      groupLoading
                        ? {
                            value: "0",
                            label: "Yuklanmoqda...",
                          }
                        : groupValue || {
                            value: "0",
                            label: "Ma'lumot topilmadi",
                          }
                    }
                    onChange={(value) => setGroupValue(value)}
                  />
                </Col>
                <Col lg={3} md={12} xs={24}>
                  <label style={{ display: "block" }} htmlFor="sem">
                    Semestr
                  </label>
                  <Select
                    size="large"
                    id="sem"
                    options={semestr}
                    style={{ width: "100%" }}
                    value={semestrValue}
                    onChange={(value) => setSemestrValue(value)}
                    optionFilterProp="label"
                    showSearch
                    filterOption={filterOption}
                  />
                </Col>
              </>
            )}

            <Col lg={schulde === "1" ? 3 : 4} md={12} xs={24}>
              <label style={{ display: "block" }} htmlFor="">
                Generatsiya
              </label>
              <Button
                style={{ width: "100%" }}
                onClick={onGenerate}
                type="primary"
                size="large"
              >
                <RiAiGenerate size={18} /> Generatsiya
              </Button>
            </Col>
          </Row>

          <ScheduleContent
            loading={loading}
            setLoading={setLoading}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default Schulde;
