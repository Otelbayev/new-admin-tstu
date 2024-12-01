import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDateContext } from "../../context/DateContext";
import { Button, message, Modal, Typography, Input } from "antd";
import DataTable from "../../components/data-table";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ImEye } from "react-icons/im";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Show from "../../components/buttons/show";
import Confirm from "../../components/buttons/cofirm";
import Reject from "../../components/buttons/reject";
const { Text } = Typography;

const Concil = () => {
  const { sendRequest, loading } = useAxios();
  const { id } = useParams();
  const { old_year } = useDateContext();
  const [data, setDate] = useState([]);
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState(null);

  const [confirmModal, setConfirmModal] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getdocumentteacher110setfacultycouncil`,
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

  const show = (id) => {
    const res = data?.documents_teacher_?.find((e) => e.id === id);
    window.open(
      `${import.meta.env.VITE_BASE_URL_IMG}${res?.file_?.url}`,
      "_blank"
    );
  };

  const confirm = async (id) => {
    try {
      message.loading({ key: "confirm", content: "Yuklamoqda.." });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/confirmfacultycouncildocument110/${id}`,
        {
          confirm: true,
          score,
          reason_for_rejection: "",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );
      if (res.status === 200) {
        setConfirmModal(false);
        message.success({ key: "confirm", content: "Tasdiqlandi!" });
        setScore(null);
        getData();
      }
    } catch (err) {
      message.error({ key: "confirm", content: err?.response?.data });
    }
  };

  const reject = async (id) => {
    if (!comment) {
      message.error({ key: "reject", content: "Izoh kiriting!" });
      return;
    }
    try {
      message.loading({ key: "reject", content: "Yukamoqda!" });
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/confirmfacultycouncildocument110/${id}`,
        {
          confirm: false,
          score: null,
          reason_for_rejection: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "reject", content: "Yuborildi!" });
        setRejectModal(false);
        setComment("");
        getData();
      }
    } catch (err) {
      message.error({ key: "reject", content: "Xatolik!" });
    }
  };

  const dataSource = useMemo(() => {
    return data?.documents_teacher_?.map((item, index) => ({
      id: item.id,
      index: index + 1,
      title: item.document_.title,
      score: item.score,
      comment: item.comment,
      sequence_status: item.sequence_status,
      rejection: item.rejection,
    }));
  }, [data]);

  const cols = [
    {
      title: "#",
      dataIndex: "index",
      width: 50,
    },
    {
      title: "Izoh",
      dataIndex: "comment",
      width: 300,
      render: (comment) => {
        if (comment.trim()?.slice(0, 4) === "http") {
          return (
            <a href={comment} target="_blank">
              {comment}
            </a>
          );
        }
        return comment;
      },
    },
    {
      title: "Hujjat",
      dataIndex: "title",
      width: 650,
    },
    {
      title: "Ball",
      dataIndex: "score",
    },
    {
      title: "Holati",
      dataIndex: "sequence_status",
      render: (status, data) => {
        if (status === 4) {
          return <Text type="success">Tasdiqlangan</Text>;
        }
        if (!data.score && data.rejection) {
          return <Text type="danger">Rad etilgan</Text>;
        }
        if (status !== 4 && !data.rejection) {
          return <Text> Jarayonda</Text>;
        }
      },
    },
    {
      title: "Ko'rish",
      fixed: "right",
      width: window?.innerWidth > 768 ? 200 : 80,
      dataIndex: "id",
      render: (id, data) => {
        if (data.sequence_status === 3 && !data.rejection) {
          return (
            <>
              <Show onClick={() => show(id)} />
              <Confirm onClick={() => setConfirmModal(id)} />
              <Reject onClick={() => setRejectModal(id)} />
            </>
          );
        }
        return <Show onClick={() => show(id)} />;
      },
    },
  ];

  return (
    <Wrapper
      title={`${data.person_?.lastName} ${data.person_?.firstName} ${data.person_?.fathers_name}`}
      back={true}
    >
      <Helmet>
        <title>{`${data.person_?.lastName} ${data.person_?.firstName} ${data.person_?.fathers_name}`}</title>
      </Helmet>
      <DataTable
        dataSource={dataSource}
        loading={loading}
        cols={cols}
        noAction={true}
      />
      <Modal
        title="Baholash"
        open={confirmModal}
        onCancel={() => setConfirmModal(null)}
        onOk={() => confirm(confirmModal)}
        okText="Ha"
        cancelText="Yo'q"
      >
        <Input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Ball"
          type="number"
        />
      </Modal>
      <Modal
        title="Rad etasizmi?"
        open={rejectModal}
        onCancel={() => setRejectModal(null)}
        okText="Ha"
        cancelText="Yo'q"
        onOk={() => reject(rejectModal)}
      >
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Izoh"
          type="text"
        />
      </Modal>
    </Wrapper>
  );
};

export default Concil;
