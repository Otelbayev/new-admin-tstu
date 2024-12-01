import { Button, Col, Form, Image, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { filterOption } from "../../../utils/filter-options";

const ImgSet = ({ lang, isUpload, editorRef, setImageModal }) => {
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [form] = Form.useForm();

  const getData = async () => {
    const res = await axios.get(
      lang === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfiles?image=true`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/files/selectgetallfilestranslation?image=true`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    if (res.status === 200) {
      setOptions(
        res.data?.map((e) => ({
          value: e.id,
          label: e.title,
          url: e.url,
        }))
      );
    }
  };

  const onFinish = async () => {
    const generateCarouselHTML = (images) => {
      const carouselItems = images
        .map(
          (item, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${import.meta.env.VITE_BASE_URL_IMG}${item.url}" 
                 class="d-block w-100" alt="${
                   item.label || "carousel image"
                 }" />
          </div>
        `
        )
        .join("");

      return `
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
    };

    const generateImageHTML = (image) => `
    <img src="${import.meta.env.VITE_BASE_URL_IMG}${image.url}" 
         alt="${image.label || "image"}" />
  `;

    if (images?.length > 1) {
      const carouselHTML = generateCarouselHTML(images);
      $(editorRef.current).summernote(
        "code",
        `${$(editorRef.current).summernote("code")} ${carouselHTML}`
      );
    } else if (images?.length === 1) {
      const imageHTML = generateImageHTML(images[0]);
      $(editorRef.current).summernote(
        "code",
        `${$(editorRef.current).summernote("code")} ${imageHTML}`
      );
    }

    setImageModal(false);
    form.resetFields();
    setImages([]);
  };

  const onSelectChange = (e) => {
    const filtered = options.filter((value) => e?.includes(value.value));
    setImages(filtered);
  };

  useEffect(() => {
    getData();
  }, [lang, isUpload]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={[5, 5]}>
        <Col xs={24}>
          {images?.length
            ? images.map((e) => (
                <Image
                  key={e.value}
                  height={150}
                  width={150}
                  src={`${import.meta.env.VITE_BASE_URL_IMG}${e.url}`}
                  style={{ objectFit: "cover", padding: "5px" }}
                />
              ))
            : null}
        </Col>
        <Col xs={24} md={18}>
          <Form.Item name="select">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              options={options?.sort((a, b) => b.value - a.value)}
              filterOption={filterOption}
              showSearch={true}
              onChange={(e) => onSelectChange(e)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Button
            type="primary"
            icon={<FaFileUpload />}
            style={{ width: "100%" }}
            htmlType="submit"
          >
            Set Image
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ImgSet;
