import { Col, Form, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { filterOption } from "../utils/filter-options";

const DepartmentChaining = ({ form }) => {
  const [fakultetData, setFakultetData] = useState([]);
  const [kafedraData, setKafedraData] = useState([]);
  const [fak, setFak] = useState(null);

  const getDeaprtment = async (url) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}${url}`);
    return res || [];
  };

  useEffect(() => {
    getDeaprtment("/departament/getalldepartamenttypesite/Fakultet").then(
      (res) =>
        setFakultetData(
          res.data?.list?.map((e) => ({
            value: e.id,
            label: e.title,
          }))
        )
    );
  }, []);

  useEffect(() => {
    setFak(fakultetData[0]?.value);
  }, [fakultetData]);

  useEffect(() => {
    if (fak) {
      getDeaprtment(`/departament/sitegetalldepartamentchild/${fak}`).then(
        (res) =>
          setKafedraData(
            res.data?.map((e) => ({
              value: e.id,
              label: e.title,
            }))
          )
      );
    }
  }, [fak]);

  useEffect(() => {
    form.setFieldValue("departament_id", kafedraData[0]?.value);
  }, [kafedraData]);

  return (
    <>
      <Col xs={24} md={8}>
        <Form.Item label="Fakultet">
          <Select
            options={fakultetData}
            value={fak}
            onChange={(e) => setFak(e)}
            filterOption={filterOption}
            showSearch
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item label="Kafedra" name="departament_id">
          <Select
            options={kafedraData}
            filterOption={filterOption}
            showSearch
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default DepartmentChaining;
