import React from "react";
import downloadfile from "../assets/110.pdf";
import styled from "styled-components";
import { FcDocument } from "react-icons/fc";

const Link = styled.a`
  transition: 0.3s;
  &:active {
    transform: scale(0.9);
  }
`;

const DownloadFile = () => {
  return (
    <Link href={downloadfile} download="O'qituvchilarni baholash">
      <FcDocument size={35} />
    </Link>
  );
};

export default DownloadFile;
