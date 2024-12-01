import { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import {
  Button,
  message,
  Modal,
  Typography,
  Input,
  Select,
  Form,
  Upload,
  Popconfirm,
} from "antd";
import axios from "axios";
import DataTable from "../../components/data-table";
import dayjs from "dayjs";
import { FiUploadCloud } from "react-icons/fi";
import Show from "../../components/buttons/show";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
const { Text } = Typography;

const StudyDep = () => {
  const [form] = Form.useForm();
  const { sendRequest, loading } = useAxios();

  const { id } = useParams();
  const { old_year } = useDateContext();

  const [data, setDate] = useState([]);

  const [modal, setModal] = useState(false);

  const [edit, setEdit] = useState(false);

  const role = Cookies.get("role");

  const getData = async () => {
    const res = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getdocumentteacher110set${
        role === "admin" ? "admin" : "studydepartament"
      }`,
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

  const dataSource = useMemo(() => {
    return data?.documents_teacher_?.map((item, index) => ({
      id: item.id,
      index: index + 1,
      title: item.document_.title,
      score: item.score,
      comment: item.comment,
      sequence_status: item.sequence_status,
      rejection: item.rejection,
      doc_id: item.document_.id,
      date: item.fixed_date,
    }));
  }, [data]);

  const onDelete = async (id) => {
    const response = await axios({
      method: "delete",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/deletedocumentteacher110set${
        role === "studydepartment" ? "studydep" : ""
      }/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    if (response.status === 200) {
      getData();
    }
  };

  const onEdit = async (id) => {
    const editData = dataSource.find((e) => e.id === id);
    if (editData) {
      form.setFieldsValue({
        comment: editData.comment,
        score: editData.score,
        year: old_year,
        date: editData.date.split("T")[0],
      });
      setModal(true);
    }
  };

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
      width: 70,
      dataIndex: "id",
      render: (id, data) => {
        if (data.doc_id !== 89) {
          return <Show onClick={() => show(id)} />;
        }
        return (
          <>
            <Show onClick={() => show(id)} />
            <Button
              type="primary"
              style={{ margin: "5px 0" }}
              onClick={() => {
                onEdit(id);
                setEdit(id);
              }}
            >
              <RiEditBoxLine size={20} />
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => onDelete(id)}
            >
              <Button type="primary" danger>
                <RiDeleteBin6Line size={20} />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    try {
      message.loading({ key: "confirm", content: "Yuklanmoqda..." });

      const formData = new FormData();

      if (edit) {
        formData.append("id", edit);
      } else {
        formData.append("person_id", id);
      }
      formData.append("old_year", Number(values.year));
      formData.append("new_year", Number(values.year) + 1);
      formData.append("document_id", 89);
      formData.append("comment", values.comment);
      formData.append("fixed_date", values.date);
      formData.append("score", Number(values.score));
      formData.append("file_up", values?.file?.fileList[0]?.originFileObj);

      const response = await axios({
        method: edit ? "put" : "post",
        url: `${import.meta.env.VITE_BASE_URL_API}${
          edit
            ? `/documentteacher110setcontroller/updatedocumentteacher110set${
                role === "studydepartment" ? "studydep" : ""
              }/${edit}`
            : `/documentteacher110setcontroller/createdocumentteacher110set${
                role === "studydepartment" ? "studydep" : ""
              }`
        }`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
        params: edit
          ? {
              id: edit,
              old_year: values.year,
              new_year: values.year + 1,
              document_id: 89,
              comment: values.comment,
              fixed_date: values.date,
              score: Number(values.score),
            }
          : {
              person_id: id,
              old_year: values.year,
              new_year: values.year + 1,
              document_id: 89,
              comment: values.comment,
              fixed_date: values.date,
              score: Number(values.score),
            },
      });

      if (response.status === 200) {
        message.success({
          key: "confirm",
          content: "Muvaffaqiyatli saqlandi!",
        });
        setModal(false);
        form.resetFields();
        getData();
      }
    } catch (err) {
      message.error({ key: "confirm", content: "Xatolik!" });
    }
  };

  return (
    <Wrapper
      title={`${data.person_?.lastName} ${data.person_?.firstName} ${data.person_?.fathers_name}`}
      back={true}
      onMaqsadClick={() => setModal(true)}
    >
      <DataTable
        loading={loading}
        dataSource={dataSource}
        cols={cols}
        noAction={true}
      />
      <Modal
        open={modal}
        onCancel={() => {
          form.resetFields();
          setModal(false);
          setEdit(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            year: dayjs().year(),
            date: dayjs().format("YYYY-MM-DD"),
          }}
        >
          <Form.Item
            label="Izoh"
            rules={[{ required: true, message: "Izoh kiriting!" }]}
            name="comment"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item label="O'quv yili" name="year">
            <Select size="large" options={studyYears} />
          </Form.Item>
          <Form.Item label="Sana" name="date">
            <Input type="date" size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ball"
            rules={[{ required: true, message: "Ball kiriting!" }]}
            name="score"
          >
            <Input size="large" type="number" min={0} />
          </Form.Item>
          <Form.Item label="Hujjat" name="file">
            <Upload maxCount={1}>
              <Button icon={<FiUploadCloud />} size="large">
                Yuklash
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              onClick={() => {
                form.resetFields();
                setModal(false);
                setEdit(false);
              }}
              style={{ marginRight: 16, width: "100px" }}
            >
              Yopish
            </Button>
            <Button
              size="large"
              style={{ width: "100px" }}
              type="primary"
              htmlType="submit"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default StudyDep;
