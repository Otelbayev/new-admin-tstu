import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Cookies from "js-cookie";
import { filterOption } from "../../../utils/filter-options";

const FileModal = ({ fileModal, setFileModal, editorRef, lang }) => {
  const [files, setFiles] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async ({ file, name, select }) => {
    const generateLinksHTML = () => {
      return select
        .map((e) => {
          const file = files.find((file) => file.value === e);
          if (file) {
            return `
          <div>
          <a href="${import.meta.env.VITE_BASE_URL_IMG}${
              file.url
            }" target="_blank">
            ${file.label}
          </a>
          </div>`;
          }
          return "";
        })
        .join("");
    };

    if (select?.length) {
      $(editorRef?.current).summernote(
        "code",
        `
    ${$(editorRef.current)?.summernote("code")} 
    <div>
      ${generateLinksHTML()}
    </div>
  `
      );
      setFileModal(false);
      form.resetFields();
      return;
    }
    try {
      const formData = new FormData();
      message.loading({ content: "Loading...", key: "updatable" });
      formData.append("url", file?.fileList[0]?.originFileObj);
      formData.append("title", name);
      if (lang !== "uz") {
        formData.append("language_id", language_id);
        formData.append("files_id", "");
      }
      const res = await axios.post(
        lang === "uz"
          ? `${import.meta.env.VITE_BASE_URL_API}/files/uploadfiles`
          : `${import.meta.env.VITE_BASE_URL_API}/files/uploadfilestranslation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
          params: {
            title: name,
          },
        }
      );

      if (res.status === 200) {
        $(editorRef.current).summernote(
          "code",
          `${$(editorRef.current).summernote("code")} 
          <a href="${import.meta.env.VITE_BASE_URL_IMG}${
            res.data.url
          }">${name}</a>
          `
        );
        message.success({
          content: "File uploaded",
          key: "updatable",
          duration: 2,
        });
        setFileModal(false);
        form.resetFields();
      }
    } catch (err) {
      message.error({
        content: "File not uploaded",
        key: "updatable",
        duration: 2,
      });
    }
  };

  const getData = async (lang) => {
    const res = await axios.get(
      lang === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfiles?image=false`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfilestranslation?image=false`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setFiles(
        res.data.map((e) => ({
          value: e.id,
          label: e.title,
          url: e.url,
        }))
      );
    }
  };

  useEffect(() => {
    getData(lang);
  }, [lang]);

  return (
    <Modal
      open={fileModal}
      onCancel={() => setFileModal(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Form.Item label="File Name" name="file">
              <Upload maxCount={1} beforeUpload={() => false}>
                <Button icon={<FiUploadCloud />}>Choose file</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="File Name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Select from server" name="select">
              <Select
                mode="multiple"
                options={files}
                showSearch={true}
                allowClear
                filterOption={filterOption}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => {
                setFileModal(false);
                form.resetFields();
              }}
            >
              Cancle
            </Button>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FileModal;
