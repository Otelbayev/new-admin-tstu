import { useEffect } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net";
import $ from "jquery";
import Cookies from "js-cookie";
import { styled } from "styled-components";
import useAxios from "../../../hooks/useAxios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loadingGif from "../../../assets/icons/loading.gif";

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

const DataTable = ({
  data,
  del,
  setIsDelete,
  col,
  edit,
  loading,
  error,
  appeal,
  confirm: confirmed,
  rejectTeacher,
  resolveTeacher,
}) => {
  const { sendRequest } = useAxios();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const role = Cookies.get("role");
  const location = useLocation();

  useEffect(() => {
    if (data?.length) {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page")) || 1;

      const table = $("#example").DataTable({
        data: data,
        columns: [
          ...col,
          {
            data: null,
            title: "Actions",
            orderable: false,
            render: function (data) {
              if (confirmed) {
                return `<div style="display: flex; gap:5px"><button class="btn btn-outline-success resolve-teacher" data-id="${data?.id}">
                    <i class="fa fa-check"></i>
                  </button>
                  <button class="btn btn-outline-danger reject-teacher" data-id="${data?.id}">
                    <i class="fa fa-x"></i>
                  </button></div>`;
              }
              return appeal
                ? `<button class="btn btn-outline-primary edit-btn" data-id="${data?.id}">
                    <i class="fa fa-eye"></i>
                  </button>`
                : `
                <div style="display: flex; gap:5px">
                  <button class="btn btn-outline-primary edit-btn" data-id="${
                    data?.id
                  }">
                    <i class="fa fa-edit"></i>
                  </button>
                  ${
                    data?.status_?.id === 1 ||
                    data?.is_deleted === false ||
                    role === "moderatorcontent"
                      ? `<button class="btn btn-outline-danger delete-btn" data-id="${data?.id}">
                    <i class="fa fa-trash"></i>
                  </button> `
                      : ""
                  }
                </div>
              `;
            },
          },
        ],
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
        destroy: true,
        responsive: true,
        ordering: false,
        pageLength: 10,
        displayStart: (page - 1) * 10,
      });

      table.on("page.dt", function () {
        let pageInfo = table.page.info();
        navigate(`?page=${pageInfo.page + 1}`);
      });

      $("#example tbody").on("click", ".edit-btn", function () {
        const id = $(this).data("id");
        handleEdit(id);
      });
      $("#example tbody").on("click", ".edit-btn", function () {
        const id = $(this).data("id");
        handleEdit(id);
      });
      $("#example tbody").on("click", ".delete-btn", function () {
        const id = $(this).data("id");
        handleDelete(id);
      });
      $("#example tbody").on("click", ".reject-teacher", function () {
        const id = $(this).data("id");
        rejectTeacher(id);
      });
      $("#example tbody").on("click", ".resolve-teacher", function () {
        const id = $(this).data("id");
        resolveTeacher(id);
      });

      return () => {
        table.destroy();
        $("#example tbody").off("click", ".edit-btn");
        $("#example tbody").off("click", ".delete-btn");
      };
    }
  }, [data, location.search]);

  const handleEdit = (id) => {
    navigate(`/${i18n.language}/admin/${edit}/${id}`);
  };

  const handleDelete = async (id) => {
    const check = confirm("Are you sure?");
    if (check) {
      try {
        const [en, ru] = await Promise.all([
          sendRequest({
            method: "get",
            url: `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetbyuzidblogtranslation/${id}?language_code=en`,
            headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
          }),
          sendRequest({
            method: "get",
            url: `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetbyuzidblogtranslation/${id}?language_code=ru`,
            headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
          }),
        ]);

        const [res2, res3, res] = await Promise.all([
          sendRequest({
            method: "delete",
            url: `${del}translation/${en.data.id}`,
            headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
          }),
          sendRequest({
            method: "delete",
            url: `${del}translation/${ru.data.id}`,
            headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
          }),
          sendRequest({
            method: "delete",
            url: `${del}/${id}`,
            headers: { Authorization: `Bearer ${Cookies.get("_token")}` },
          }),
        ]);

        if (res.status === 200) {
          setIsDelete({ none: "none" });
        }
      } catch (err) {
        alert("Error");
      }
    }
  };

  return data?.length ? (
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
  );
};

export default DataTable;
