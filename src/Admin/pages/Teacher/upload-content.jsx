import {
  Col,
  Form,
  message,
  Row,
  Input,
  DatePicker,
  Upload as U,
  Button,
  Typography,
  Flex,
  Modal,
  Popconfirm,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useAxios from "../../../hooks/useAxios";
import { FiEdit, FiEye, FiTrash, FiUploadCloud } from "react-icons/fi";
import DataTable from "../../components/data-table";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const { Text } = Typography;

const Upload = ({ id, old_year, new_year, upd, max_score, score }) => {
  const [isEdit, setIsEdit] = useState(null);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [modalId, setModalId] = useState(false);

  const { sendRequest } = useAxios();

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

  const onFinish = async (e) => {
    try {
      message.loading({ key: "form", content: "Yuklanmoqda.." });
      const formData = new FormData();
      formData.append("old_year", old_year);
      formData.append("new_year", new_year);
      formData.append("document_id", id);
      formData.append("comment", e.comment);
      formData.append("fixed_date", e.date);
      formData.append("number_authors", 0);
      formData.append("file_up", e.file?.fileList[0]?.originFileObj);

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
            comment: e.comment,
            fixed_date: e.date,
            number_authors: 0,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "form", content: "Muvofaqiyatli yuklandi!" });
        form.resetFields();
        getData(id);
      }
    } catch (err) {
      message.error({ key: "form", content: "Xatolik!" });
    }
  };

  const onSave = async (e) => {
    try {
      message.loading({ key: "error", content: "Loading!" });
      const formData = new FormData();
      formData.append("old_year", Number(old_year));
      formData.append("new_year", Number(new_year));
      formData.append("document_id", Number(id));
      formData.append("comment", e.comment);
      formData.append("fixed_date", e.date);
      formData.append("number_authors", 0);
      formData.append("file_up", e.file?.fileList[0]?.originFileObj);
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110setcontroller/updatedocumentteacher110set/${isEdit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            old_year,
            new_year,
            document_id: id,
            comment: e.comment,
            fixed_date: e.date,
            number_authors: 0,
          },
        }
      );

      if (res.status === 200) {
        message.success({
          key: "error",
          content: "Muvofaqiyatli o'zgartirildi!",
        });
        getData(id);
        setIsEdit(null);
        form1.resetFields();
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

  const onEdit = (id) => {
    setIsEdit(id);
    const oldData = data.find((e) => e.id === id);
    form1.setFieldsValue({
      comment: oldData.comment,
      date: dayjs(oldData.fixed_date),
    });
  };

  useEffect(() => {
    getData(id);
  }, [upd]);

  const cols = [
    { title: "#", dataIndex: "index", width: 10 },
    { title: "Izoh", dataIndex: "comment" },
    {
      title: "Holati",
      fixed: "right",
      render: function (item) {
        return item?.score ? (
          <Text type="success">Tasdiqlangan</Text>
        ) : item.rejection ? (
          <Flex gap="10px" align="center">
            <Text type="danger">Rad etildi</Text>
            <Button onClick={() => setModalId(item.id)}>Izoh...</Button>
            <Modal
              title="Izoh"
              onCancel={() => setModalId(null)}
              open={item.id === modalId}
              okButtonProps={{
                style: {
                  display: "none",
                },
              }}
              cancelButtonProps={{
                style: {
                  display: "none",
                },
              }}
            >
              {item.reason_for_rejection || "Rad etilgan"}
            </Modal>
          </Flex>
        ) : (
          <Text>Jarayonda</Text>
        );
      },
    },
    { title: "Ball", dataIndex: "score" },
    { title: "Sana", dataIndex: "date" },
    {
      title: "Tahrirlash",
      render: function (data) {
        return (
          <Flex gap="5px">
            <Button
              style={{ width: "50px" }}
              onClick={() => onEdit(data.id)}
              icon={<FiEdit size={20} />}
            />
            <Link
              target="_blank"
              to={`${import.meta.env.VITE_BASE_URL_IMG}${data.file}`}
            >
              <Button
                type="primary"
                style={{ width: "50px" }}
                icon={<FiEye size={20} />}
              />
            </Link>
            {data.score || data.score === 0 ? null : (
              <Popconfirm
                title="Tasdiqlang"
                description="Bu vazifani oʻchirib tashlaysizmi?"
                onConfirm={() => onDel(data.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  type="primary"
                  style={{ width: "50px" }}
                  icon={<FiTrash size={20} />}
                />
              </Popconfirm>
            )}
            <Modal
              open={data.id === isEdit}
              onCancel={() => setIsEdit(null)}
              footer={false}
            >
              <Form layout="vertical" onFinish={onSave} form={form1}>
                <Row gutter={[10, 10]}>
                  <Col xs={24}>
                    <Form.Item
                      rules={[{ required: true, message: "Izoh kiriting!" }]}
                      name="comment"
                    >
                      <Input placeholder="Izoh" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      rules={[{ required: true, message: "Sana kiriting!" }]}
                      name="date"
                    >
                      <DatePicker
                        placeholder="Sana"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="file">
                      <U beforeUpload={() => false} maxCount={1}>
                        <Button icon={<FiUploadCloud />}>Yuklash</Button>
                      </U>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Yangliash
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Flex>
        );
      },
    },
  ];

  const dataSource = useMemo(() => {
    return data.map((e, index) => ({
      index: index + 1,
      id: e.id,
      comment: e.comment,
      date: e.fixed_date.split("T")[0],
      score: e.score,
      rejection: e.rejection,
      reason_for_rejection: e.reason_for_rejection,
      file: e?.file_?.url,
    }));
  }, [data]);

  return (
    <div>
      {max_score > score && id !== 89 && (
        <Form onFinish={onFinish} form={form}>
          <Row gutter={[10, 10]}>
            <Col xs={24} md={6}>
              <Form.Item
                rules={[{ required: true, message: "Izoh kiriting!" }]}
                name="comment"
              >
                <Input placeholder="Izoh" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                rules={[{ required: true, message: "Sana kiriting!" }]}
                name="date"
              >
                <DatePicker placeholder="Sana" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                rules={[{ required: true, message: "Fayl kiriting!" }]}
                name="file"
              >
                <U beforeUpload={() => false} maxCount={1}>
                  <Button icon={<FiUploadCloud />}>Yuklash</Button>
                </U>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Yuklash
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <DataTable cols={cols} dataSource={dataSource} noAction={true} />
    </div>
  );
};

export default Upload;
