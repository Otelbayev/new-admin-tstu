import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "../../../../../public/logo/logo2.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useAxios from "./../../../../hooks/useAxios";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";

const File = () => {
  const { id } = useParams();
  const { sendRequest } = useAxios();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/appealtorector/getbyidappealtorector/${id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });
      response.status === 200 && setData(response.data);
    }
    fetchData();
  }, []);

  const confirm = async (e) => {
    e.preventDefault();
    try {
      message.loading({ key: "confirm", content: "Tasdiqlanmoqda..." });

      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/appealtorector/updateappealtorector/${id}?confirm=true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        navigate(`/${i18n.language}/admin/appeals`);
        message.success({
          key: "confirm",
          content: "Muvofaqiyatli tasdiqlandi!",
        });
      }
    } catch (err) {
      message.error({ key: "confirm", content: "Xatolik" });
    }
  };

  const contentRef = useRef(null);

  const downloadTableAsWord = () => {
    const tableContent = document.getElementById("myTable").outerHTML;
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + tableContent + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `appeal${id}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="body A4" ref={contentRef}>
      <section className="sheet padding-10mm">
        <table
          border={1}
          id="myTable"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <tbody>
            <tr className="b-o">
              <td className="b-o" colSpan={2} style={{ width: "45%" }}>
                <span style={{ fontSize: 16 }}>
                  <b>
                    Toshkent davlat transport universiteti rektorining virtual
                    qabulxonasi orqali kelib tushgan murojaat
                  </b>
                  <br />
                  <br />
                </span>
              </td>
              <td className="b-o">
                <img
                  loading="lazy"
                  src={logo}
                  alt="logo"
                  style={{ height: 60 }}
                />
                <br />
                <br />
                <b style={{ fontSize: 16 }}>REKTORGA MUROJAAT</b>
                <br />
              </td>
            </tr>
            <tr className="b-all">
              <td style={{ width: 25 }}>1</td>
              <td className="td-l">Murojaat tartib raqami</td>
              <td className="td-l">{data?.id}</td>
            </tr>
            <tr className="b-all">
              <td>2</td>
              <td className="td-l">Murojaat tushgan sana</td>
              <td className="td-l">{data.created_at}</td>
            </tr>
            <tr className="b-all">
              <td>3</td>
              <td className="td-l">
                <b>Murojaat etuvchi</b>
              </td>
              <td className="td-l" />
            </tr>
            <tr className="b-all">
              <td>3.1</td>
              <td className="td-l">F.I.SH.</td>
              <td className="td-l">{data?.fio_}</td>
            </tr>
            <tr className="b-all">
              <td>3.2</td>
              <td className="td-l">Jinsi</td>
              <td className="td-l">{data?.gender_?.gender}</td>
            </tr>
            <tr className="b-all">
              <td>4</td>
              <td className="td-l">
                <b>Murojaat etuvchi manzili</b>
              </td>
              <td className="td-l" />
            </tr>
            <tr className="b-all">
              <td>4.1</td>
              <td className="td-l">Davlat</td>
              <td className="td-l">{data?.country_?.title}</td>
            </tr>
            <tr className="b-all">
              <td>4.2</td>
              <td className="td-l">Viloyat yoki Respublika</td>
              <td className="td-l">{data?.territorie_?.title}</td>
            </tr>
            <tr className="b-all">
              <td>4.3</td>
              <td className="td-l">Tuman</td>
              <td className="td-l">{data?.district_?.title}</td>
            </tr>
            <tr className="b-all">
              <td>4.4</td>
              <td className="td-l">Ko‘cha uy</td>
              <td className="td-l">{data?.neighborhood_?.title}</td>
            </tr>
            <tr className="b-all">
              <td>5</td>
              <td className="td-l">Murojaat etuvchining tug‘ulgan sanasi</td>
              <td className="td-l">{data?.birthday}</td>
            </tr>
            <tr className="b-all">
              <td>6</td>
              <td className="td-l">Murojaat etuvchining bandligi</td>
              <td className="td-l">{data?.employe_?.title}</td>
            </tr>
            <tr className="b-all">
              <td>7</td>
              <td className="td-l">
                Yuridik shaxs (tadbirkorlik subekti) nomi
              </td>
              <td className="td-l" />
            </tr>
            <tr className="b-all">
              <td>8</td>
              <td className="td-l">Telefon raqami</td>
              <td className="td-l">{data?.telephone_number_one}</td>
            </tr>
            <tr className="b-all">
              <td>9</td>
              <td className="td-l">Qo‘shimcha telefon raqami</td>
              <td className="td-l">{data?.telephone_number_two}</td>
            </tr>
            <tr className="b-all">
              <td>10</td>
              <td className="td-l">E-mail</td>
              <td className="td-l">{data?.email}</td>
            </tr>
            <tr className="b-all">
              <td>11</td>
              <td className="td-l">Fayl</td>
              <td className="td-l">
                {data?.file_?.url ? (
                  <NavLink
                    target="_blank"
                    to={`${import.meta.env.VITE_BASE_URL_IMG}${
                      data?.file_?.url
                    }`}
                  >
                    {`${import.meta.env.VITE_BASE_URL_IMG}/${
                      data?.file_?.title
                    }`}
                  </NavLink>
                ) : (
                  "Mavjud emas"
                )}
              </td>
            </tr>
            <tr className="b-all">
              <td>12</td>
              <td className="td-l" colSpan={2}>
                <b>Murojaatning qisqacha mazmuni:</b>
                <br />
                {data?.appeal}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <form className="no-print no_dw">
          <div style={{ paddingTop: 30 }}>
            <center>
              <button
                onClick={confirm}
                className="btn btn-primary"
                type="submit"
              >
                Tasdiqlash
              </button>
              <br />
              <br />
              <NavLink href="#" onClick={downloadTableAsWord}>
                Yuklab olish
              </NavLink>
            </center>
          </div>
        </form>
      </section>
    </div>
  );
};

export default File;
