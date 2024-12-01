import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import loadingGif from "../../assets/icons/loading.gif";
import { useTranslation } from "react-i18next";

const PrivateRoute = () => {
  const { loading, error, sendRequest } = useAxios();
  const token = Cookies.get("_token");
  const { i18n } = useTranslation();

  const getData = async () => {
    await sendRequest({
      method: "get",
      url: `${import.meta.env.VITE_BASE_URL_API}/user/verification`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  if (!token) {
    return <Navigate to={`/${i18n.language}/signin`} />;
  }

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 115px)",
      }}
    >
      <img loading="lazy" style={{ width: "80px" }} src={loadingGif} alt="" />
    </div>
  ) : error ? (
    <Navigate to={`/${i18n.language}/signin`} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
