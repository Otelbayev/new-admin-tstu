import { useEffect, useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDateContext } from "../../context/DateContext";
import styled from "styled-components";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net";
import $ from "jquery";
import loadingGif from "../../../assets/icons/loading.gif";
import { Input, Select } from "../../components/Generics";
import { studyYears } from "../../utils/mock";
import { message } from "antd";
import axios from "axios";

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

const StudyDep = () => {
  const { sendRequest, loading, error } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { old_year } = useDateContext();

  const commentRef = useRef();
  const [oldYear, setOldYear] = useState(2024);
  const dateRef = useRef();
  // const authorRef = useRef();
  const ballRef = useRef();
  const fileRef = useRef();

  const [data, setDate] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [docId, setDocId] = useState(null);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getdocumentteacher110setstudydepartament`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        oldYear: old_year,
        newYear: Number(old_year) + 1,
        person_id: id,
      },
    });

    res.status === 200 && setDate(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data?.documents_teacher_?.length) {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page")) || 1;

      const table = $("#example")?.DataTable({
        data: data.documents_teacher_.sort((a, b) => a.id - b.id),
        columns: [
          { data: "id", title: "#" },
          { data: "comment", title: "Izoh" },
          { data: "document_.title", title: "Hujjat" },
          {
            title: "Holati",
            render: function (data, type, row) {
              if (row.rejection) {
                return `<p class="text-danger">Rad etilgan</p>`;
              }
              if (row.sequence_status === 4) {
                return `<p class="text-success">Tasdiqlangan</p>`;
              } else {
                return `<p class="text-primary">Jarayonda</p>`;
              }
            },
          },
          {
            title: "Ball",
            render: function (data, type, row) {
              if (!row?.score) {
                return "";
              }
              return `<div class="text-center"><h4>${row?.score}</h4> ${
                row?.assessor_?.person_?.firstName || ""
              } ${row?.assessor_?.person_?.lastName || ""} ${
                row?.assessor_?.person_?.fathers_name || ""
              }</div>`;
            },
          },
          {
            data: null,
            title: "Tahrirlash",
            orderable: false,
            render: function (data) {
              if (data.document_?.id !== 89) {
                return `<div style="display: flex; gap:5px"> 
                <button class="btn btn-primary show" data-id="${data?.id}">
                              <i class="fa fa-eye"></i>
                      </button>      
                  </div> `;
              }
              return `<div style="display: flex; gap:5px"> 
              
              <button class="btn btn-primary show" data-id="${data?.id}">
                            <i class="fa fa-eye"></i>
                    </button>    
 <button class="btn btn-outline-primary update" data-toggle="modal"
                            data-target="#exampleModal" data-id="${data?.id}">
                            <i class="fa fa-edit"></i>
                    </button>    
                     <button class="btn btn-outline-danger delete" 
                            data-id="${data?.id}">
                            <i class="fa fa-trash"></i>
                    </button>    
                </div> `;
            },
          },
        ],
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
      $("#example tbody").on("click", ".show", function () {
        const id = $(this).data("id");
        show(id);
      });
      $("#example tbody").on("click", ".update", function () {
        const id = $(this).data("id");
        getById(id);
        setIsUpdate(true);
      });
      $("#example tbody").on("click", ".delete", function () {
        const id = $(this).data("id");
        handleDelete(id);
      });

      return () => {
        table.destroy();
        $("#example tbody").off("click", ".show");
        $("#example tbody").off("click", ".update");
        $("#example tbody").off("click", ".delete");
      };
    }
  }, [data, location.search]);

  const show = (id) => {
    const res = data?.documents_teacher_?.find((e) => e.id === id);
    window.open(
      `${import.meta.env.VITE_BASE_URL_IMG}${res?.file_?.url}`,
      "_blank"
    );
  };

  const getById = async (id) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getbyiddocumentteacher110setstudydep/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });

    if (res.status === 200) {
      setDocId(res.data.id);
      commentRef.current.value = res.data?.comment;
      dateRef.current.value = res.data?.fixed_date?.split("T")[0];
      // authorRef.current.value = res.data?.number_authors;
      ballRef.current.value = res.data?.score;
      fileRef.current.value = null;
      setOldYear(res.data?.old_year);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("person_id", id);
    formData.append("old_year", Number(oldYear));
    formData.append("new_year", Number(oldYear) + 1);
    formData.append("document_id", 89);
    formData.append("comment", commentRef?.current?.value);
    formData.append("fixed_date", dateRef?.current?.value);
    // formData.append("number_authors", Number(authorRef?.current?.value));
    formData.append("score", Number(ballRef?.current?.value));
    formData.append("file_up", fileRef?.current?.files[0] || null);

    try {
      message.loading({ key: "uin", content: "Yuborilmoqda!" });
      const response = await axios({
        method: "post",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/createdocumentteacher110setstudydep`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
        params: {
          person_id: id,
          old_year: oldYear,
          new_year: oldYear + 1,
          document_id: 89,
          comment: commentRef?.current?.value,
          fixed_date: dateRef?.current?.value,
          // number_authors: Number(authorRef?.current?.value),
          score: Number(ballRef?.current?.value),
        },
      });

      if (response.status === 200) {
        message.success({ key: "uin", content: "Yaratildi!" });
        commentRef.current.value = "";
        setOldYear(2024);
        // authorRef.current.value = null;
        ballRef.current.value = null;
        fileRef.current.value = "";
        dateRef.current.value = "";
        getData();
        document.getElementById("closeBtn").click();
      }
    } catch (err) {
      message.error({ key: "uin", content: err?.response?.data || "Error" });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("old_year", Number(oldYear));
    formData.append("new_year", Number(oldYear) + 1);
    formData.append("document_id", 89);
    formData.append("comment", commentRef?.current?.value);
    formData.append("fixed_date", dateRef?.current?.value);
    // formData.append("number_authors", Number(authorRef?.current?.value));
    formData.append("score", Number(ballRef?.current?.value));
    formData.append("file_up", fileRef?.current?.files[0] || null);

    try {
      message.loading({ key: "uin", content: "Yuborilmoqda!" });
      const response = await axios({
        method: "put",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/updatedocumentteacher110setstudydep/${docId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
        params: {
          old_year: oldYear,
          new_year: oldYear + 1,
          document_id: 89,
          comment: commentRef?.current?.value,
          fixed_date: dateRef?.current?.value,
          // number_authors: Number(authorRef?.current?.value),
          score: Number(ballRef?.current?.value),
        },
      });

      if (response.status === 200) {
        message.success({ key: "uin", content: "Yangilandi!" });
        commentRef.current.value = "";
        setOldYear(2024);
        // authorRef.current.value = null;
        ballRef.current.value = null;
        fileRef.current.value = "";
        dateRef.current.value = "";
        getData();
        document.getElementById("closeBtn").click();
      }
    } catch (err) {
      message.error({ key: "uin", content: err?.response?.data || "Error" });
      
    }
  };

  const handleDelete = async (id) => {
    const g = confirm("Are you sure!");
    if (g) {
      const response = await axios({
        method: "delete",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/deletedocumentteacher110setstudydep/${id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      if (response.status === 200) {
        getData();
        document.getElementById("closeBtn").click();
      }
    }
  };

  const onMaqsadClick = () => {
    setIsUpdate(false);
    commentRef.current.value = "";
    setOldYear(2024);
    // authorRef.current.value = null;
    ballRef.current.value = null;
    fileRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <Wrapper
      title={`${data.person_?.lastName} ${data.person_?.firstName} ${data.person_?.fathers_name}`}
      back={true}
      additional={true}
      onMaqsadClick={onMaqsadClick}
    >
      {data.documents_teacher_?.length ? (
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
      <div>
        <div
          className="modal fade "
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Maqsadli parametr
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="row" onSubmit={handleSubmit}>
                  <Input className="col-md-12" ref={commentRef} label="Izoh" />
                  <Select
                    className={"col-md-6"}
                    label={"O'quv yili"}
                    options={studyYears}
                    value={oldYear}
                    onChange={(e) => setOldYear(e)}
                  />
                  <Input
                    className="col-md-6"
                    type="date"
                    label="Sana"
                    ref={dateRef}
                  />
                  {/* <Input
                    className="col-md-6"
                    type="number"
                    label="Avtorlar soni"
                    ref={authorRef}
                  /> */}
                  <Input
                    className="col-md-6"
                    type="number"
                    label="Ball"
                    ref={ballRef}
                  />
                  <Input
                    className="col-md-6"
                    type="file"
                    label="Fayl"
                    ref={fileRef}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="closeBtn"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Yopish
                </button>
                {isUpdate ? (
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="btn btn-primary"
                  >
                    Yangilash
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-success"
                  >
                    Qo'shish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StudyDep;
