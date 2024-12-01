import React, { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import Input from "../Input";
import ChooseFile from "../ChooseFile";
import Select from "../Select";
import axios from "axios";
import Cookies from "js-cookie";
import { useLanguageContext } from "./../../../../context/LanguageContext/index";

const FileImg = ({ className, lan, editorRef }) => {
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === lan)?.id;

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  const [select, setSelect] = useState("other");
  const [select2, setSelect2] = useState(null);

  const [selectData, setSelectData] = useState([]);
  const [select2Data, setSelect2Data] = useState([]);
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");

  const fileRef = useRef();
  const fileRef2 = useRef();

  const onModalOk = async () => {
    if (select === "other") {
      message.loading({ content: "Loading...", key: "updatable" });
      const formData = new FormData();
      formData.append("title", title);
      formData.append("url", fileRef?.current?.files[0]);
      if (lan !== "uz") {
        formData.append("language_id", language_id);
        formData.append("files_id", "");
      }
      const res = await axios.post(
        lan === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`
          : `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            title,
          },
        }
      );
      if (res.status === 200) {
        fileRef.current.value = "";
        $(editorRef.current).summernote(
          "code",
          `${$(editorRef.current).summernote("code")} 
          <a href="${import.meta.env.VITE_BASE_URL_IMG}${
            res.data.url
          }">${title}</a>
          `
        );
        setTitle("");
        message.success({
          content: "File uploaded",
          key: "updatable",
          duration: 2,
        });
        setModal(false);
      } else {
        message.error({
          content: "File not uploaded",
          key: "updatable",
          duration: 2,
        });
      }
    } else {
      $(editorRef.current).summernote(
        "code",
        `${$(editorRef.current)?.summernote("code")} 
        <a href="${import.meta.env.VITE_BASE_URL_IMG}${
          selectData.find((e) => e.value === select)?.url
        }">${selectData.find((e) => e.value === select)?.label}</a>`
      );
      setSelect("other");
      setShow(true);
    }
    setModal(false);
  };

  const onModalCancle = () => {
    setTitle("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setSelect("other");
    setShow(true);
    setModal(false);
  };

  const onModal2Ok = async () => {
    if (show2) {
      setTitle2("");
      fileRef2.current.value = "";
      setModal2(false);
    } else {
      if (select2.length === 1) {
        select2Data.forEach((el) => {
          if (select2[0] === el.value) {
            $(editorRef.current).summernote(
              "code",
              `${$(editorRef.current)?.summernote("code")} 
              <img src="${`${import.meta.env.VITE_BASE_URL_IMG}${
                el.url
              }`}" alt="${el.label}" />`
            );
          }
        });
      } else {
        const carouselItems = select2Data
          .filter((e) => select2.includes(e.value))
          .map(
            (item, index) => `
            <div key="${index}" class="carousel-item ${
              index === 0 ? "active" : ""
            }">
              <img src="${import.meta.env.VITE_BASE_URL_IMG}${
              item.url
            }" class="d-block w-100" alt="carousel img" />
            </div>
          `
          )
          .join("");

        const carouselHTML = `
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              ${carouselItems}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        `;

        $(editorRef.current).summernote(
          "code",
          `${$(editorRef.current)?.summernote("code")} ${carouselHTML}`
        );
      }

      setSelect2(null);
      setShow2(true);
      setModal2(false);
    }
  };

  const onModal2Cancle = () => {
    setModal2(false);
    if (show2) {
      setTitle2("");
      fileRef2.current.value = "";
    } else {
      setSelect2(null);
      setShow2(true);
    }
  };

  const uploadToServer = async () => {
    try {
      message.loading({ content: "Loading...", key: "updatable" });

      if (!fileRef2?.current?.files[0] || !title2) {
        message.error({
          content: "File not uploaded",
          key: "updatable",
          duration: 2,
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", title2);
      formData.append("url", fileRef2?.current?.files[0]);
      if (lan !== "uz") {
        formData.append("language_id", language_id);
        formData.append("files_id", "");
      }
      const res = await axios.post(
        lan === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`
          : `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            title,
          },
        }
      );

      if (res.status === 200) {
        message.success({
          content: "File uploaded",
          key: "updatable",
          duration: 2,
        });
        setTitle2("");
        fileRef2.current.value = "";
      }
    } catch (err) {
      message.error({
        content: "File not uploaded",
        key: "updatable",
        duration: 2,
      });
    }
  };

  const onSelectChange = (e) => {
    e === "other" ? setShow(true) : setShow(false);
    setSelect(e);
  };

  const getData = async (value) => {
    const res = await axios.get(
      lan === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfiles?image=${value}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfilestranslation?image=${value}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    return res.data;
  };

  useEffect(() => {
    getData("false").then((res) =>
      setSelectData(
        res.map((e) => ({
          value: e.id,
          label: e.title,
          url: e.url,
        }))
      )
    );
  }, [modal]);

  useEffect(() => {
    getData("true").then((res) =>
      setSelect2Data(
        res.map((e) => ({
          value: e.id,
          label: e.title,
          url: e.url,
        }))
      )
    );
  }, [show2]);

  return (
    <div className={className}>
      <label className="col-sm-4 col-form-label">FILE ({lan})</label>
      <div className="row">
        <div className="col-md-6">
          <button
            className="btn btn-secondary w-100 mb-3"
            type="button"
            onClick={() => setModal(true)}
          >
            Upload file
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-secondary w-100"
            type="button"
            onClick={() => setModal2(true)}
          >
            Upload image
          </button>
        </div>
      </div>

      <Modal
        title={`Upload file (${lan})`}
        open={modal}
        onOk={onModalOk}
        onCancel={onModalCancle}
        width={750}
        okButtonProps={{
          style: { fontSize: "16px", height: "40px", width: "100px" },
        }}
        cancelButtonProps={{
          style: {
            fontSize: "16px",
            height: "40px",
            width: "150px",
          },
        }}
      >
        <div className="row my-4">
          {show && (
            <Input
              label="Text"
              className="col-md-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {show && (
            <ChooseFile label="File" className="col-md-6" ref={fileRef} />
          )}
          <Select
            label="File"
            className={"col-md-12"}
            value={select}
            onChange={onSelectChange}
            options={[
              { label: "other", value: "other" },
              ...selectData?.sort((a, b) => b.value - a.value),
            ]}
          />
        </div>
      </Modal>

      <Modal
        title={`Upload image (${lan})`}
        open={modal2}
        onOk={onModal2Ok}
        onCancel={onModal2Cancle}
        okButtonProps={{
          style: { fontSize: "16px", height: "40px", width: "100px" },
        }}
        cancelButtonProps={{
          style: {
            fontSize: "16px",
            height: "40px",
            width: "150px",
          },
        }}
        width={800}
      >
        <div className="row">
          <div className="col-12 col-sm-12">
            <div className="card card-primary card-tabs">
              <div className="card-header p-0 pt-1">
                <ul className="nav nav-tabs">
                  <li className="nav-item" onClick={() => setShow2(true)}>
                    <a className={`nav-link ${show2 ? "active" : ""}`}>
                      Загрузка Изображение
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setShow2(false)}>
                    <a className={`nav-link ${show2 ? "" : "active"}`}>
                      Вставка Изображение
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {show2 ? (
                  <div className="row">
                    <Input
                      label="Text"
                      className="col-md-4"
                      value={title2}
                      onChange={(e) => setTitle2(e.target.value)}
                    />
                    <ChooseFile
                      label="File"
                      className="col-md-5"
                      ref={fileRef2}
                    />
                    <div className="col-md-2">
                      <label
                        htmlFor="submit"
                        className="col-sm-12 col-form-label"
                      >
                        Upload
                      </label>
                      <div className="col-sm-12 ">
                        <input
                          type="button"
                          className="btn btn-primary"
                          id="submit"
                          value={"Upload to Server"}
                          onClick={uploadToServer}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="form-group col-md-6">
                      <Select
                        label="Text"
                        mode="multiple"
                        showSearch={true}
                        options={select2Data?.sort((a, b) => b.value - a.value)}
                        value={select2}
                        onChange={(e) => setSelect2(e)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="col-sm-4 col-form-label">Image</label>
                      <div className="col-sm-12">
                        {select2?.length ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL_IMG}${
                              select2?.length > 1
                                ? select2Data.filter((e) =>
                                    select2.includes(e.value)
                                  )[select2?.length - 1]?.url
                                : select2Data?.find((e) => e.value == select2)
                                    ?.url
                            }`}
                            id="imageold_uz_img"
                            style={{ width: "100%" }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FileImg;
