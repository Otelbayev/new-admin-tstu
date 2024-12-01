import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./../../../components/Wrapper";
import { Input, Select } from "../../../components/Generics";
import { useUserContext } from "../../../context/UserContext";
import { usePersonContext } from "../../../context/PersonContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useStatusContext } from "./../../../context/Status/index";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const { getUserType, userTypeData } = useUserContext();
  const { getPersonData, personData } = usePersonContext();
  const { getStatus, statusData } = useStatusContext();

  const { i18n } = useTranslation();
  const naviagte = useNavigate();
  const { id } = useParams();

  const [userType, setUserType] = useState(null);
  const [person, setPerson] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [active, setActive] = useState(true);

  const [login, setLogin] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL_API}/usercrud/updateuser/${id}`,
      {
        login,
        password: pw,
        email,
        user_type_id: userType,
        person_id: person,
        status_id: status,
        removed,
        active,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    res?.status === 200 && naviagte(`/${i18n.language}/admin/users`);
  };

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/usercrud/getbyiduser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setLogin(res.data?.login);
      setEmail(res.data?.email);
      setUserType(res.data?.user_type_?.id);
      setPerson(res.data?.person_?.id);
      setRemoved(res.data?.removed);
      setActive(res.data?.active);
      setStatus(res.data?.status_?.id);
    }
  };

  useEffect(() => {
    getData();
    getUserType("uz");
    getPersonData("uz");
    getStatus("uz");
  }, []);

  return (
    <Wrapper title="Create Users">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input
            label="Login"
            className="form-group col-md-4"
            value={login || ""}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            label="Password"
            className="form-group col-md-4"
            type="password"
            value={pw || ""}
            onChange={(e) => setPw(e.target.value)}
          />
          <Input
            label="Email"
            className="form-group col-md-4"
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            label="User Type"
            className={"form-group col-md-3"}
            options={userTypeData}
            onChange={(e) => setUserType(e)}
            value={userType}
          />
          <Select
            label="Person"
            className={"form-group col-md-3"}
            options={personData}
            value={person}
            onChange={(e) => setPerson(e)}
          />
          <Select
            label="Removed"
            className={"form-group col-md-3"}
            value={removed}
            onChange={(e) => setRemoved(e)}
            options={[
              { value: true, label: "true" },
              { value: false, label: "false" },
            ]}
          />
          <Select
            label="Active"
            className={"form-group col-md-3"}
            value={active}
            onChange={(e) => setActive(e)}
            options={[
              { value: true, label: "true" },
              { value: false, label: "false" },
            ]}
          />
          <Select
            label="Status"
            className={"form-group col-md-3"}
            options={statusData}
            value={status}
            onChange={(e) => setStatus(e)}
          />
          <div className="col-md-12 m-2">
            <button className="btn btn-primary">Yangilash</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Edit;
