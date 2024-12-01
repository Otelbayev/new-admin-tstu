import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "../../components/Generics";
import { message } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/avatar.png";
import { Helmet } from "react-helmet";

const Profile = () => {
  const userData = JSON.parse(Cookies.get("_userDetails"));
  const { i18n } = useTranslation();
  const naviagte = useNavigate();

  const [name, setName] = useState(userData?.person_?.firstName);
  const [surname, setSurname] = useState(userData?.person_?.lastName);
  const [father, setFather] = useState(userData?.person_?.fathers_name);
  const [email, setEmail] = useState(userData?.person_?.email);
  const [login, setLogin] = useState(userData?.login);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const iconRef = useRef(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("login", `${login}`);
    formData.append("password", `${password}`);
    formData.append("oldPassword", `${oldPassword}`);
    formData.append("person_.firstName", `${name}`);
    formData.append("person_.lastName", `${surname}`);
    formData.append("person_.fathers_name", `${father}`);
    formData.append("person_.email", `${email}`);
    formData.append("img_up", iconRef?.current?.files[0]);

    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL_API}/user/userprofilupdated`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      message.success({
        key: "dfkv",
        content: "Successfully changed!",
      });
      Cookies.remove("_token");
      Cookies.remove("_userDetails");
      naviagte(`/${i18n.language}/signin`);
    } else {
      message.error({
        key: "dfkv",
        content: "Xatolik!",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin | Profile</title>
      </Helmet>
      <div className="content-wrapper wrapper-min-height">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        loading="lazy"
                        className="profile-user-img img-fluid img-circle elevation-2"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                        src={
                          userData?.person_?.img_?.url
                            ? `${import.meta.env.VITE_BASE_URL_IMG}${
                                userData?.person_?.img_?.url
                              }`
                            : avatar
                        }
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {surname} {name}
                    </h3>
                    <p className="text-muted text-center">
                      {userData?.user_type_?.type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="settings">
                        <form
                          onSubmit={onHandleSubmit}
                          className="form-horizontal"
                        >
                          <Input
                            label="Ism"
                            className="form-group"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Input
                            label="Familiya"
                            className="form-group"
                            value={surname || ""}
                            onChange={(e) => setSurname(e.target.value)}
                          />
                          <Input
                            label="Otasining ismi"
                            className="form-group"
                            value={father || ""}
                            onChange={(e) => setFather(e.target.value)}
                          />
                          <Input
                            label="Rasm"
                            className="form-group"
                            type="file"
                            ref={iconRef || ""}
                          />
                          <Input
                            label="Email"
                            className="form-group"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Input
                            label="Login"
                            className="form-group"
                            value={login || ""}
                            onChange={(e) => setLogin(e.target.value)}
                          />
                          <Input
                            label="Hozirgi parol"
                            className="form-group"
                            value={oldPassword || ""}
                            type="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                          <Input
                            label="Yangi parol"
                            className="form-group"
                            value={password || ""}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="form-group">
                            <div className="col-sm-10">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
