import React, { useState } from "react";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { createStyles } from "antd-style";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;

  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const DataTable = ({
  dataSource,
  loading,
  cols,
  setIsDelete,
  del,
  edit,
  noAction,
}) => {
  const { styles } = useStyle();
  const naviagte = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { i18n } = useTranslation();

  const handleOk = async (id) => {
    try {
      message.loading({ key: "confirm", content: "O'chirilmoqda..." });
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_API}${del}${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "confirm", content: "O'chirildi" });
        setIsDelete(res);
      }
    } catch (err) {
      message.error({ key: "confirm", content: "Xatolik" });
    }
  };

  const filteredData = dataSource?.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    ...cols,
    {
      title: "Action",
      width: 145,
      fixed: "right",
      render: (a) => {
        return (
          <>
            <Button
              onClick={() => {
                naviagte(
                  edit ? `/${i18n.language}${edit}${a.id}` : `edit/${a.id}`
                );
              }}
              type="primary"
            >
              <RiEditBoxLine size={20} />
            </Button>
            {a.status === "Faol" && (
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleOk(a.id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <Button type="primary" danger style={{ marginLeft: "5px" }}>
                  <RiDeleteBin6Line size={20} />
                </Button>
              </Popconfirm>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Input
        placeholder="Qidirish"
        style={{ marginBottom: "10px" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        className={styles.customTable}
        pagination={true}
        columns={noAction ? cols : columns}
        dataSource={filteredData}
        loading={loading}
        scroll={{
          x: "max-content",
        }}
      />
    </div>
  );
};
export default DataTable;
