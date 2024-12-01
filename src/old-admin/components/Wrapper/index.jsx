import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

const Wrapper = ({
  children,
  title,
  create,
  path,
  date,
  setData,
  sendRequest,
  isDelete,
  url,
  back,
  additional,
  onMaqsadClick,
}) => {
  const { i18n } = useTranslation();

  const role = Cookies.get("role");
  const navigate = useNavigate();

  function getCurrentDate(prop) {
    const date = new Date();

    if (prop === "now") {
      // Current date
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else if (prop === "old") {
      // Subtract 1 month
      date.setMonth(date.getMonth() - 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else {
      return "Invalid prop";
    }
  }

  const [start, setStart] = useState(getCurrentDate("old"));
  const [end, setEnd] = useState(getCurrentDate("now"));

  const getData = async () => {
    const response = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }${url}?&start_time=${start}&end_time=${end}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    setData(
      role === "moderatorcontent"
        ? response?.data?.list?.sort((a, b) => a.id - b.id)
        : response?.data.sort((a, b) => a.id - b.id)
    );
  };

  useEffect(() => {
    if (date) {
      getData();
    }
  }, [isDelete]);

  function handleClick(e) {
    e.preventDefault();
    getData();
  }

  return (
    <div>
      <Helmet>
        <title>Admin | {title || ""}</title>
      </Helmet>
      <div className="content-wrapper wrapper-min-height">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <h1>{title}</h1>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <section className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    {date ? (
                      <form onSubmit={handleClick} action="">
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="card-title">
                              {create && (
                                <NavLink
                                  to={`/${i18n.language}/admin/blogs/create`}
                                  className="btn btn-primary"
                                >
                                  Yaratish
                                </NavLink>
                              )}
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <input
                              type="date"
                              className="form-control"
                              name="subday"
                              id="subday"
                              value={start}
                              onChange={(e) => setStart(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-3">
                            <input
                              type="date"
                              className="form-control"
                              name="today"
                              id="today"
                              value={end}
                              onChange={(e) => setEnd(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="refresh"
                              style={{ width: "100%" }}
                            >
                              Jadvalni yangilash
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="card-title">
                        {create && (
                          <NavLink
                            to={path ? path : "create"}
                            className="btn btn-primary"
                          >
                            Yaratish
                          </NavLink>
                        )}
                        {back && (
                          <NavLink
                            onClick={() => navigate(-2)}
                            className="btn btn-primary"
                          >
                            Orqaga
                          </NavLink>
                        )}
                        {additional && (
                          <button
                            data-toggle="modal"
                            data-target="#exampleModal"
                            className="btn btn-outline-primary mx-2"
                            onClick={onMaqsadClick}
                          >
                            Maqsadli parametr
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="card-body">{children}</div>
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

export default Wrapper;
