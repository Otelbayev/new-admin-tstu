import React, { useEffect, useMemo, useState } from "react";
import useAxios from "./../../../hooks/useAxios";
import DataTable from "../../components/data-table";
import Wrapper from "../../components/wrapper";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { Typography } from "antd";
import Show from "../../components/buttons/show";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const Appeals = () => {
  const { sendRequest, loading } = useAxios();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const cols = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "F.I.O",
      dataIndex: "fio_",
      key: "fio_",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tashkilot",
      dataIndex: "country_",
      key: "country_",
    },
    {
      title: "Sana",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "confirm",
      key: "confirm",
      render: (confirm) => {
        return confirm ? (
          <Text type="success">Tasdiqlangan!</Text>
        ) : (
          <Text type="danger">Tasdiqlanmagan!</Text>
        );
      },
    },
    {
      title: "Ko'rish",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <Show onClick={() => navigate(`${id}`)} />;
      },
    },
  ];

  const defaultStartDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");

  const onFinish = async (values) => {
    const response = await sendRequest({
      method: "get",
      url: `${
        import.meta.env.VITE_BASE_URL_API
      }/appealtorector/getallappealtorector?&start_time=${
        values?.start_date || defaultStartDate
      }&end_time=${values?.end_date || defaultEndDate}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("_token")}`,
      },
    });
    setData(response?.data);
  };

  const dataSource = useMemo(
    () =>
      data.map((item, index) => ({
        index: index + 1,
        id: item.id,
        fio_: item.fio_,
        email: item.email,
        phone: item.telephone_number_one,
        country_: item.country_.title,
        date: dayjs(item.created_at).format("YYYY-MM-DD"),
        confirm: item.confirm,
      })),
    [data]
  );

  useEffect(() => {
    onFinish();
  }, []);

  return (
    <Wrapper
      title="Murojaatlar"
      form
      onFinish={onFinish}
      defaultStartDate={defaultStartDate}
      defaultEndDate={defaultEndDate}
    >
      <DataTable
        dataSource={dataSource?.sort((a, b) => a.id - b.id)}
        loading={loading}
        cols={cols}
        noAction={true}
      />
    </Wrapper>
  );
};

export default Appeals;
