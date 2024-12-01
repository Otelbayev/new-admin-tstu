import { Button, Flex } from "antd";
import React, { useState } from "react";
import { CiFileOn, CiImageOn } from "react-icons/ci";
import FileModal from "./file-modal";
import ImgModal from "./img-modal";
import { useLanguageContext } from "../../../../context/LanguageContext";

const Upload = ({ editorRef, lang }) => {
  const [fileModal, setFileModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === lang)?.id;
  return (
    <Flex gap="10px">
      <Button
        style={{ width: "100%" }}
        onClick={() => setFileModal(true)}
        icon={<CiFileOn />}
      >
        Upload file
      </Button>
      <Button
        style={{ width: "100%" }}
        onClick={() => setImageModal(true)}
        icon={<CiImageOn />}
      >
        Upload image
      </Button>
      <FileModal
        editorRef={editorRef}
        fileModal={fileModal}
        setFileModal={setFileModal}
        lang={lang}
      
      />
      <ImgModal
        editorRef={editorRef}
        imageModal={imageModal}
        setImageModal={setImageModal}
        lang={lang}
        language_id={language_id}
      />
    </Flex>
  );
};

export default Upload;
