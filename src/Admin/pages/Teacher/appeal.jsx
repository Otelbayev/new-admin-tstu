import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net";
import $ from "jquery";
import loadingGif from "../../../assets/icons/loading.gif";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Div = styled.div`
  td:last-child {
    width: 30%;
  }
  td {
    text-align: center !important;
  }
  th {
    text-align: center !important;
  }
`;

const Appeal = () => {
  const { sendRequest, error, loading } = useAxios();
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page")) || 1;

      const table = $("#example").DataTable({
        data: data,
        columns: [
          { data: "id", title: "#" },
          { data: "full_name", title: "FISH" },
          { data: "email", title: "Email" },
          { data: "subject", title: "Bandligi" },
          {
            data: null,
            title: "Sana",
            render: function (data, type, row) {
              return row?.created_at?.slice(0, 10);
            },
          },
          { data: "message", title: "Murojaat" },
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
      $("#example tbody").on("click", ".delete-btn", function () {
        const id = $(this).data("id");
        handleDelete(id);
      });

      return () => {
        table.destroy();
        $("#example tbody").off("click", ".edit-btn");
        $("#example tbody").off("click", ".delete-btn");
      };
    }
  }, [data, location.search]);

  return (
    <Wrapper
      title="Murojaatlar"
      create={false}
      setData={setData}
      sendRequest={sendRequest}
      date={true}
      isDelete={""}
      url="/appealtoemployee/getallappealtoemployee"
    >
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

export default Appeal;
