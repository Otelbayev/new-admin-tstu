import { ChooseFile, Input } from "../../components/Generics";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import loadingGif from "../../../assets/icons/loading.gif";
import useAxios from "../../../hooks/useAxios";

const Upload = ({ id, old_year, new_year, upd, max_score, score, author }) => {
  const textRef = useRef();
  const fileRef = useRef();
  const dateRef = useRef();
  const countRef = useRef();

  const editTextRef = useRef();
  const editFileRef = useRef();
  const editDateRef = useRef();
  const editCountRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);

  const { sendRequest, loading, error } = useAxios();

  const getData = async (id) => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getbydocumentiddocumentteacher110set/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
      params: {
        oldYear: old_year,
        newYear: Number(old_year) + 1,
      },
    });

    if (res.status === 200) {
      setData(res?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileRef?.current?.files[0] || !textRef.current.value) {
      message.error("All files are required");
      return;
    }

    try {
      message.loading({ key: "form", content: "Yuklanmoqda.." });
      const formData = new FormData();
      formData.append("old_year", old_year);
      formData.append("new_year", new_year);
      formData.append("document_id", id);
      formData.append("comment", textRef?.current?.value);
      formData.append("fixed_date", dateRef?.current?.value);
      formData.append("number_authors", Number(countRef?.current?.value) || 0);
      formData.append("file_up", fileRef?.current?.files[0]);

      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/createdocumentteacher110set`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            old_year,
            new_year,
            document_id: id,
            comment: textRef?.current?.value,
            fixed_date: dateRef?.current?.value,
            number_authors: countRef?.current?.value,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "form", content: "Muvofaqiyatli yuklandi!" });
        textRef.current.value = "";
        fileRef.current.value = "";
        getData(id);
      }
    } catch (err) {
      message.error({ key: "form", content: "Xatolik!" });
    }
  };

  const onSave = async (key) => {
    if (!editTextRef.current?.value) {
      message.error("All files are required");
      return;
    }
    try {
      message.loading({ key: "error", content: "Loading!" });

      const formData = new FormData();
      formData.append("old_year", Number(old_year));
      formData.append("new_year", Number(new_year));
      formData.append("document_id", Number(id));
      formData.append("comment", editTextRef?.current?.value);
      formData.append("fixed_date", editDateRef?.current?.value);
      formData.append(
        "number_authors",
        Number(editCountRef?.current?.value) || 0
      );
      formData.append("file_up", editFileRef?.current?.files[0]);

      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/updatedocumentteacher110set/${key}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            old_year,
            new_year,
            document_id: id,
            comment: editTextRef?.current?.value,
            fixed_date: editDateRef?.current?.value,
            number_authors: editCountRef?.current?.value,
          },
        }
      );

      if (res.status === 200) {
        setIsEdit(false);
        message.success({
          key: "error",
          content: "Muvofaqiyatli o'zgartirildi!",
        });
        getData(id);
      }
    } catch (err) {
      message.error({ key: "error", content: "Xatolik!" });
    }
  };

  const onDel = async (key) => {
    const res = await axios.delete(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/deletedocumentteacher110set/${key}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      getData(id);
    }
  };

  useEffect(() => {
    getData(id);
  }, [upd]);

  return (
    <div>
      {max_score > score && id !== 89 && (
        <form className="row" onSubmit={handleSubmit}>
          <Input
            ref={textRef}
            placeholder="Izoh"
            className="form-group col-md-4"
          />
          <Input ref={dateRef} type="date" className="form-group col-md-2" />
          {author && (
            <Input
              ref={countRef}
              placeholder="Mualliflar soni"
              type="number"
              className="form-group col-md-2"
            />
          )}
          <ChooseFile
            ref={fileRef}
            className={author ? "form-group col-md-3" : "form-group col-md-4"}
          />
          <div
            className={author ? "form-group col-md-1" : "form-group col-md-2"}
          >
            <button className="btn btn-primary w-100" type="submit">
              Yuklash
            </button>
          </div>
        </form>
      )}

      {data?.length ? (
        <table
          width={"100%"}
          border="1"
          style={{ borderColor: "lightgray", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th className="py-2">Izoh</th>
              <th className="py-2">Holati</th>
              <th className="py-2">Ball</th>
              <th className="py-2">Sana</th>
              {author && <th className="py-2">Mualliflar soni</th>}
              <th className="py-2">Tahrirlash</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <>
                  <tr key={item?.id}>
                    <td>
                      {item.id === isEdit ? (
                        <Input defaultValue={item.comment} ref={editTextRef} />
                      ) : (
                        item.comment
                      )}
                    </td>
                    {item.id === isEdit ? (
                      <td colSpan={2}>
                        <ChooseFile ref={editFileRef} />
                      </td>
                    ) : (
                      <td style={{ width: "20%" }}>
                        {item.score ? (
                          <p className="text-success">Tasdiqlangan</p>
                        ) : item.rejection ? (
                          <div class="d-flex justify-content-center align-items-center">
                            <p class="text-danger my-0 mx-3">Rad etildi</p>
                            <a
                              className="btn btn-outline-primary py-1 px-2"
                              data-toggle="modal"
                              data-target={`#exampleModal${item.id}`}
                            >
                              Izoh...
                            </a>
                          </div>
                        ) : (
                          <p className="text-primary">Jarayonda</p>
                        )}
                      </td>
                    )}
                    {item.id !== isEdit && (
                      <td style={{ width: "10%" }}>{item?.score}</td>
                    )}
                    <td style={{ width: "15%" }}>
                      {item.id === isEdit ? (
                        <Input
                          ref={editDateRef}
                          defaultValue={item.fixed_date?.split("T")[0]}
                          type="date"
                        />
                      ) : (
                        item.fixed_date?.split("T")[0]
                      )}
                    </td>
                    {author && (
                      <td style={{ width: "15%" }}>
                        {item.id === isEdit ? (
                          <Input
                            defaultValue={item.number_authors}
                            ref={editCountRef}
                          />
                        ) : (
                          item.number_authors
                        )}
                      </td>
                    )}
                    <td style={{ width: "15%" }}>
                      {isEdit === item.id && (
                        <button
                          onClick={() => onSave(item.id)}
                          className="btn btn-success m-1"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      )}
                      {isEdit === item.id && (
                        <button
                          onClick={() => setIsEdit(null)}
                          className="btn btn-danger m-1"
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      )}
                      {item.id !== isEdit && (
                        <NavLink
                          target="_blank"
                          to={`${import.meta.env.VITE_BASE_URL_IMG}${
                            item?.file_?.url
                          }`}
                          className={"btn btn-secondary my-1"}
                        >
                          <i className="fa-solid fa-file"></i>
                        </NavLink>
                      )}
                      {item.id !== isEdit && !item.score && (
                        <button
                          onClick={() => setIsEdit(item.id)}
                          className="btn btn-primary m-1"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                      )}
                      {item.id !== isEdit && !item.score && (
                        <button
                          onClick={() => onDel(item.id)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                  <div
                    className="modal fade"
                    id={`exampleModal${item.id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Rad edilgan
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
                          {item.reason_for_rejection || "Rad etilgan"}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Yopish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default Upload;
