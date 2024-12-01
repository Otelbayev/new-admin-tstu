import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Select } from "../../../../components/Generics";
import { useStatusContext } from "./../../../../context/Status/index";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { sendRequest } = useAxios();
  const token = Cookies.get("_token");

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const titleRef = useRef(null);
  const [titleStyle, setTitleStyle] = useState({});

  const tokenRef = useRef(null);
  const [tokenStyle, setTokenStyle] = useState({});

  const { id } = useParams();
  const [status, setStatus] = useState(null);

  const { statusData, getStatus } = useStatusContext();

  useEffect(() => {
    async function getByID() {
      const res = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/Tokens/getbyidtokens/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        titleRef.current.value = res?.data?.title;
        tokenRef.current.value = res?.data?.token;
        setStatus(res?.data?.status_.id);
      }
    }

    getByID();
    getStatus("uz");
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (!titleRef.current.value) {
      setTitleStyle({ border: "1px solid red" });
      return;
    }

    if (!tokenRef.current.value) {
      setTokenStyle({ border: "1px solid red" });
      return;
    }

    try {
      message.loading({ key: "key", content: "Loading..." });

      const res = await sendRequest({
        method: "put",
        url: `${import.meta.env.VITE_BASE_URL_API}/Tokens/updatetokens/${id}`,
        data: {
          title: titleRef.current.value,
          token: tokenRef.current.value,
          status_id: status,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        message.success({ content: "Success", key: "key", duration: 2 });
        navigate(`/${i18n.language}/admin/token`);
      } else {
        throw new Error();
      }
    } catch (err) {
      message.error({ content: "Error", key: "key", duration: 2 });
    }
  };

  return (
    <Wrapper title="Edit Token">
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <Input
            className="col-md-4"
            ref={titleRef}
            label="Title"
            style={titleStyle}
            onFocus={() => setTitleStyle({})}
          />
          <Input
            className="col-md-4"
            ref={tokenRef}
            label="Token"
            style={tokenStyle}
            onFocus={() => setTokenStyle({})}
          />
          <Select
            className={"col-md-4"}
            label="Status"
            options={statusData}
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className="row">
          <div className="col-md-3 m-2">
            <button type="submit" className="btn w-100 btn-success">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
