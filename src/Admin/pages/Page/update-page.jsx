import React, { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload as UploadAntd,
} from "antd";
import Editor from "../../components/Generics/Editor";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import Upload from "../../components/Generics/Upload";
import { FiUploadCloud } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { usePageCacheContext } from "../../context/PageCacheContext";
import { useStatusContext } from "../../context/Status";
import { useEdit } from "../../hooks/useEdit";
import { useLanguageContext } from "../../../context/LanguageContext";

const UpdatePage = () => {
  const [lang, setLang] = useState("uz");
  const textRef = useRef(null);
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === lang)?.id;
  const { id } = useParams();
  const { pageCache, setPageCache } = usePageCacheContext();
  const [form] = Form.useForm();
  const { statusData, getStatus } = useStatusContext();

  const [img, setImg] = useState("");
  const [isCreate, setIsCreate] = useState(true);
  const [transId, setTransId] = useState(null);

  const dataCache = useMemo(() => {
    return pageCache.find((page) => page.id == id);
  }, [pageCache]);

  const getData = async (value, id) => {
    if (dataCache && value === "uz") {
      setIsCreate(false);
      form.setFieldValue({
        title: dataCache.title,
        desc: dataCache.description,
        short: dataCache.title_short,
        status: dataCache.status_?.id,
      });
      $(textRef.current).summernote("code", dataCache.text);
      setImg(dataCache.img_?.url);
      return;
    }
    try {
      const response = await axios({
        method: "get",
        url:
          value === "uz"
            ? `${import.meta.env.VITE_BASE_URL_API}/page/getbyidpage/${id}`
            : `${
                import.meta.env.VITE_BASE_URL_API
              }/page/getbyuzidpagetranslation/${id}?language_code=${value}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });

      if (response.status === 200) {
        if (value !== "uz") {
          setTransId(response.data.id);
        }
        setIsCreate(false);
        form.setFieldsValue({
          title: response.data.title,
          desc: response.data.description,
          short: response.data.title_short,
          status:
            response.data.status_?.id || response.data.status_translation_?.id,
        });
        $(textRef.current).summernote("code", response.data.text);
        setImg(
          response.data?.img_?.url || response.data?.img_translation_?.url
        );
      } else {
        setIsCreate(true);
        form.resetFields();
        $(textRef.current).summernote("code", "");
        setImg("");
      }
    } catch (error) {
      setIsCreate(true);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title_short", values.short);
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("text", $(textRef.current).summernote("code"));
    formData.append("img_up", values?.image?.fileList[0]?.originFileObj);
    formData.append("position", 1);
    formData.append("favorite", false);
    formData.append("status", values.status);

    const res = await useEdit(
      isCreate,
      lang,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/page/updatepage`,
      `${import.meta.env.VITE_BASE_URL_API}/page/updatepagetranslation`,
      [
        { page_id: id },
        { language_id },
        { status_translation_id: values.status },
      ],
      ["status_id"],
      `${import.meta.env.VITE_BASE_URL_API}/page/createpagetranslation`,
      [{ page_id: id }, { language_id }]
    );

    if (res?.status === 200) {
      setIsCreate(false);
      if (lang === "uz") {
        setPageCache((prev) => prev.filter((e) => e.id != id));
      }
      getData(lang, id);
    }
  };

  useEffect(() => {
    getData(lang, id);
    getStatus(lang);
  }, [lang, id]);

  return (
    <Wrapper title={isCreate ? "Add Page" : "Update Page"}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Title is required" }]}
              label={`Title (${lang})`}
              name="title"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Short Title is required" }]}
              label={`Short Title (${lang})`}
              name="short"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              rules={[{ required: true, message: "Description is required" }]}
              label={`Description (${lang})`}
              name="desc"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={`Text (${lang})`}>
              <Editor lan={lang} ref={textRef} />
            </Form.Item>
          </Col>
          <Col xs={24} md={16} lg={12}>
            <Form.Item label={`Image and File (${lang})`}>
              <Upload editorRef={textRef} lang={lang} />
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8} lg={6}>
              <Form.Item
                rules={[{ required: true, message: "Required" }]}
                label={`Status (${lang})`}
                name="status"
              >
                <Select style={{ width: "100%" }} options={statusData} />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={8}>
            <Form.Item label={`Image (${lang})`} name="image">
              <UploadAntd
                maxCount={1}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<FiUploadCloud />}>Choose file</Button>
              </UploadAntd>
            </Form.Item>
          </Col>
          {!isCreate && (
            <Col xs={24} md={8} lg={6}>
              <Image src={`${import.meta.env.VITE_BASE_URL_IMG}${img}`} />
            </Col>
          )}
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isCreate ? "Create" : "Update"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UpdatePage;
