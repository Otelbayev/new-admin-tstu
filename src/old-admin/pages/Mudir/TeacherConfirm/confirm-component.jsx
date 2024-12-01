import React, { useState, useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import useAxios from "../../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import loadingGif from "../../../../assets/icons/loading.gif";
import styled from "styled-components";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net";
import $ from "jquery";

const Div = styled.div`
  td:last-child {
    width: 100px;
  }
  td:first-child {
    width: 5%;
    text-align: center !important;
  }
  th {
    text-align: center !important;
  }
`;

const ConfirmComponent = ({ title, url, con, col }) => {
  const { loading, error, sendRequest } = useAxios();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [modalId, setModalId] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}${url}/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    res.status === 200 && setData(res.data?.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (data?.length) {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page")) || 1;

      const table = $("#example")?.DataTable({
        data: data,
        columns: col
          ? [
              { data: "id", title: "# " },
              {
                data: null,
                title: "Sana",
                render: function (data) {
                  return `${data.since_when} - ${data.until_when}`;
                },
              },
              { data: "whom", title: "whom" },
              { data: "where", title: "where" },
              {
                data: null,
                title: "Tasdiqlash",
                orderable: false,
                render: function (data) {
                  switch (data.confirmed) {
                    case 0:
                      return `<div style="display: flex; gap:5px">      
                <button class="btn btn-outline-success confirm" data-toggle="modal" data-target=".modal1" data-id="${data?.id}">
                <i class="fa fa-check"></i>
                </button>
                <button class="btn btn-outline-danger reject" data-toggle="modal" data-target=".modal2" data-id="${data?.id}">
                <i class="fa fa-times"></i>
                </button>
                </div> `;
                    case 1:
                      return `<div class="text-success">Tasdiqlangan</div> `;
                    case 2:
                      return `<div class="text-danger">Rad etilgan</div> `;
                  }
                },
              },
            ]
          : [
              { data: "id", title: "#" },
              { data: "title", title: "Nomi" },
              { data: "description", title: "Izoh" },
              { data: "text", title: "Text" },
              {
                data: null,
                title: "Tasdiqlash",
                orderable: false,
                render: function (data) {
                  switch (data.confirmed) {
                    case 0:
                      return `<div style="display: flex; gap:5px">      
                <button class="btn btn-outline-success confirm" data-toggle="modal" data-target=".modal1" data-id="${data?.id}">
                <i class="fa fa-check"></i>
                </button>
                <button class="btn btn-outline-danger reject" data-toggle="modal" data-target=".modal2" data-id="${data?.id}">
                <i class="fa fa-times"></i>
                </button>
                </div> `;
                    case 1:
                      return `<div class="text-success">Tasdiqlangan</div> `;
                    case 2:
                      return `<div class="text-danger">Rad etilgan</div> `;
                  }
                },
              },
            ],
        destroy: true,
        responsive: true,
        ordering: false,
        pageLength: 10,
        displayStart: (page - 1) * 10,
        language: {
          search: "Qidirish:",
          lengthMenu: "Har sahifada _MENU_ ta yozuv ko'rsatiladi",
          zeroRecords: "Hech qanday mos yozuv topilmadi",
          info: "Jami _TOTAL_ yozuvdan _START_ dan _END_ gacha bo'lgan yozuvlar ko'rsatilmoqda",
          infoEmpty: "Yozuvlar mavjud emas",
          infoFiltered: "(_MAX_ yozuvlar ichidan filtrlangan)",
          paginate: {
            first: "Birinchi",
            last: "Oxirgi",
            next: "Keyingi",
            previous: "Oldingi",
          },
        },
      });

      table.on("page.dt", function () {
        let pageInfo = table.page.info();
        navigate(`?page=${pageInfo.page + 1}`);
      });

      $("#example tbody").on("click", ".confirm", function () {
        const id = $(this).data("id");
        setModalId(id);
      });
      $("#example tbody").on("click", ".reject", function () {
        const id = $(this).data("id");
        setModalId(id);
      });

      return () => {
        table.destroy();
        $("#example tbody").off("click", ".edit-btn");
        $("#example tbody").off("click", ".delete-btn");
      };
    }
  }, [data, location.search]);

  async function rejectTeacher() {
    const res = await sendRequest({
      method: "POST",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }${con}/confirmed/${modalId}?confirm=false`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      data: {
        confirm: true,
        person_portfolio_id: Number(modalId),
      },
    });

    if (res.status === 200) {
      getData();
    }
  }
  async function resolveTeacher() {
    const res = await sendRequest({
      method: "POST",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }${con}/confirmed/${modalId}?confirm=true`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      body: {},
    });

    if (res.status === 200) {
      getData();
    }
  }

  return (
    <Wrapper title={title} back={true}>
      <div
        className="modal fade bd-example-modal-sm modal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="mySmallModalLabel">
                Tasdiqlaysizmi?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  data-dismiss="modal"
                  onClick={resolveTeacher}
                >
                  Ha
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger mx-1"
                  data-dismiss="modal"
                >
                  Yo'q
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade bd-example-modal-sm  modal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="mySmallModalLabel">
                Rad etasizmi?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-outline-success w-100"
                    data-dismiss="modal"
                    onClick={rejectTeacher}
                  >
                    Ha
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    data-dismiss="modal"
                  >
                    Yo'q
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.length ? (
        <Div>
          <table
            id="example"
            className="display responsive table table-bordered w-100"
          ></table>
        </Div>
      ) : (
        <table className="display responsive table w-100">
          <tbody>
            <tr>
              <td colSpan={10} className="text-center">
                {loading ? (
                  <div>
                    <img
                      loading="lazy"
                      style={{ width: "50px" }}
                      src={loadingGif}
                      alt=""
                    />
                  </div>
                ) : error ? (
                  "Error"
                ) : (
                  "Ma'lumot yo'q"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Wrapper>
  );
};

export default ConfirmComponent;
