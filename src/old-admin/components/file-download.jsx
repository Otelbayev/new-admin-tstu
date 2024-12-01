import React from "react";
import file from "../../assets/icons/file.png";
import downloadfile from "../assets/110.pdf";
import styled from "styled-components";

const Link = styled.a`
  transition: 0.3s;
  &:active {
    transform: scale(0.9);
  }
`;

const DownloadFile = () => {
  return (
    <Link
      href={downloadfile}
      download="O'qituvchilarni baholash"
      className="btn"
    >
      <img src={file} style={{ width: "35px" }} alt="" />
    </Link>
  );
};

export default DownloadFile;
