import { Modal, Tabs } from "antd";
import React, { useState } from "react";
import ImgUpload from "./img-upload";
import ImgSet from "./img-set";

const ImgModal = ({
  imageModal,
  setImageModal,
  editorRef,
  lang,
  language_id,
}) => {
  const [isUpload, setIsUpload] = useState({});

  const items = [
    {
      key: "1",
      label: "Upload to server",
      children: (
        <ImgUpload
          setIsUpload={setIsUpload}
          lang={lang}
          language_id={language_id}
        />
      ),
    },
    {
      key: "2",
      label: "Upload from server",
      children: (
        <ImgSet
          lang={lang}
          isUpload={isUpload}
          editorRef={editorRef}
          language_id={language_id}
          setImageModal={setImageModal}
        />
      ),
    },
  ];

  return (
    <Modal
      open={imageModal}
      onCancel={() => setImageModal(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default ImgModal;
