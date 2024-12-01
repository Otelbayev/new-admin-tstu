import React, { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Upload as UploadAntd,
  Button,
  Image,
  InputNumber,
} from "antd";
import LanguageSelect from "../../components/Generics/LanguageSelect";
import Upload from "../../components/Generics/Upload";
import { FiUploadCloud } from "react-icons/fi";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useBlogContext } from "../../context/BlogContext";
import { useParams } from "react-router-dom";
import Editor from "../../components/Generics/Editor";
import useAxios from "../../../hooks/useAxios";
import Cookies from "js-cookie";
import { useBlogCacheContext } from "../../context/BlogCacheContext";
import dayjs from "dayjs";
import { useEdit } from "../../hooks/useEdit";
import { useStatusContext } from "../../context/Status";

const UpdateBlog = () => {
  const [lang, setLang] = useState("uz");

  const { options } = useLanguageContext();
  const { blogCache, setBlogCache } = useBlogCacheContext();
  const { blogCategoryOptions, getBlogCategorySelect } = useBlogContext();
  const [form] = Form.useForm();
  const { statusData, getStatus } = useStatusContext();

  const language_id = options.find((option) => option.code === lang)?.id;
  const textRef = useRef(null);
  const { sendRequest } = useAxios();
  const { id } = useParams();
  const role = Cookies.get("role");

  const [data, setData] = useState({});
  const [isCreate, setIsCreate] = useState(false);
  const [transId, setTransId] = useState(null);

  const [uz_bog_categoty_id, setUz_bog_categoty_id] = useState(null);

  const cacheData = useMemo(() => {
    return blogCache.find((e) => e.id == id);
  }, [blogCache, id]);

  const getData = async (value, id) => {
    if (cacheData && lang === "uz") {
      setData(cacheData);
      setIsCreate(false);
      setUz_bog_categoty_id(cacheData?.blog_category_?.id);
      form.setFieldsValue({
        short: cacheData?.title_short,
        title: cacheData?.title,
        desc: cacheData?.description,
        position: cacheData?.position,
        favo: cacheData?.favorite,
        start_date: dayjs(cacheData?.event_date),
        end_date: dayjs(cacheData?.event_end_date),
        blog_category: cacheData?.blog_category_?.id,
        status: cacheData?.status_?.id,
      });
      $(textRef.current).summernote("code", cacheData.text);
      return;
    }

    try {
      const res = await sendRequest({
        method: "get",
        url:
          value === "uz"
            ? `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/${
                role === "admin" ? "getbyidblog" : "sitegetbyidblog"
              }/${id}`
            : `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/${
                role === "admin"
                  ? "getbyuzidblogtranslation"
                  : "sitegetbyuzidblogtranslation"
              }/${id}?language_code=${value}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      });

      if (res.status === 200) {
        if (value !== "uz") {
          setTransId(res?.data?.id);
        } else {
          setUz_bog_categoty_id(res?.data?.blog_category_?.id);
        }
        setData(res.data);
        setIsCreate(false);
        form.setFieldsValue({
          short: res?.data?.title_short,
          title: res?.data?.title,
          desc: res?.data?.description,
          position: res?.data?.position,
          favo: res?.data?.favorite,
          start_date: dayjs(res?.data?.event_date),
          end_date: dayjs(res?.data?.event_end_date),
          blog_category:
            res?.data?.blog_category_?.id ||
            res.data?.blog_category_translation_?.id,
          status: res?.data?.status_?.id || res?.data?.status_translation_?.id,
        });
        $(textRef.current).summernote("code", res?.data?.text);
      } else {
        setIsCreate(true);
        form.setFieldsValue({
          short: "",
          title: "",
          desc: "",
        });
        $(textRef.current).summernote("code", "");
      }
    } catch (err) {
      setIsCreate(true);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title_short", values.short);
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("text", $(textRef.current).summernote("code"));
    if (role === "admin") {
      formData.append("status_id", values.status);
    }
    formData.append("img_up", values?.image?.fileList[0]?.originFileObj);
    formData.append("position", values.position);
    formData.append("favorite", values.favo);
    formData.append("event_date", values.start_date);
    formData.append("event_end_date", values.end_date);

    if (lang === "uz") {
      formData.append("blog_category_id", values.blog_category);
    } else {
      formData.append(
        "blog_category_id",
        blogCategoryOptions.find((e) => e.value === uz_bog_categoty_id)?.parent
      );
      console.log(
        blogCategoryOptions.find((e) => e.value === uz_bog_categoty_id)?.parent
      );
    }

    const res = await useEdit(
      isCreate,
      lang,
      "formData",
      id,
      transId,
      formData,
      `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/updateblog${
        role !== "admin" ? "moderatorcontent" : ""
      }`,
      `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/updateblogtranslation${
        role !== "admin" ? "moderatorcontent" : ""
      }`,
      [
        { blog_id: id },
        { language_id },
        { status_translation_id: values.status },
        {
          blog_category_translation_id: values.blog_category,
        },
      ],
      ["blog_category_id"],
      `${
        import.meta.env.VITE_BASE_URL_API
      }/blogcontroller/createblogtranslation`,
      [
        { language_id },
        { blog_id: id },
        {
          blog_category_translation_id: values.blog_category,
        },
      ],
      ["blog_category_id"]
    );

    if (res?.status === 200) {
      setIsCreate(false);
      if (lang === "uz") {
        setBlogCache((prev) => {
          return prev.filter((e) => e.id != id);
        });
      }
      getData(lang, id);
    }
  };

  useEffect(() => {
    getBlogCategorySelect(lang);
    getData(lang, id);
    if (role === "admin") {
      getStatus(lang);
    }
  }, [lang]);

  return (
    <Wrapper title={isCreate ? "Add Blog" : "Update Blog"}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <LanguageSelect onChange={(e) => setLang(e)} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label={`Title (${lang})`} name="title">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label={`Short Title (${lang})`} name="short">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label={`Description (${lang})`} name="desc">
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
          <Col xs={24} md={8} lg={6}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Event Date (${lang})`}
              name="start_date"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Event end date (${lang})`}
              name="end_date"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Blog Category (${lang})`}
              name="blog_category"
            >
              <Select style={{ width: "100%" }} options={blogCategoryOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Position (${lang})`}
              name="position"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Form.Item
              rules={[{ required: true, message: "Required" }]}
              label={`Favorite (${lang})`}
              name="favo"
            >
              <Select style={{ width: "100%" }} options={favoOptions} />
            </Form.Item>
          </Col>
          {role === "admin" && !isCreate && (
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
          <Col xs={24} md={8} lg={6}>
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
          <Col xs={24} md={8} lg={6}>
            <Image
              src={`${import.meta.env.VITE_BASE_URL_IMG}${
                data.img_?.url || data.img_translation_?.url
              }`}
            />
          </Col>
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

export default UpdateBlog;

const favoOptions = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];
