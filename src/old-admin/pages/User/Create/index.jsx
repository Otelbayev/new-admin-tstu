import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./../../../components/Wrapper";
import { Input, Select } from "../../../components/Generics";
import { useUserContext } from "../../../context/UserContext";
import { usePersonContext } from "../../../context/PersonContext";
import { useCreate } from "./../../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { getUserType, userTypeData } = useUserContext();
  const { getPersonData, personData } = usePersonContext();
  const { i18n } = useTranslation();
  const naviagte = useNavigate();

  const [userType, setUserType] = useState(null);
  const [person, setPerson] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [active, setActive] = useState(true);

  const loginRef = useRef(null);
  const pwRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await useCreate(
      "uz",
      "obj",
      {
        login: loginRef?.current?.value,
        password: pwRef?.current?.value,
        email: emailRef?.current?.value,
        user_type_id: userType,
        person_id: person,
        removed,
        active,
      },
      `${import.meta.env.VITE_BASE_URL_API}/usercrud/createuser`
    );

    res?.statusCode === 200 && naviagte(`/${i18n.language}/admin/users`);
  };

  useEffect(() => {
    getUserType("uz");
    getPersonData("uz");
    setUserType(userTypeData[0]?.value);
    setPerson(personData[0]?.value);
  }, []);

  return (
    <Wrapper title="Create Users">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input label="Login" className="form-group col-md-4" ref={loginRef} />
          <Input
            label="Password"
            className="form-group col-md-4"
            type="password"
            ref={pwRef}
          />
          <Input
            label="Email"
            className="form-group col-md-4"
            type="email"
            ref={emailRef}
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
          <div className="col-md-3 m-2">
            <button className="btn btn-success w-100">Yaratish</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
