import { Button } from "antd";
import React from "react";
import { IoMdClose } from "react-icons/io";

const Reject = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: "red", color: "white" }}
    >
      <IoMdClose size={20} />
    </Button>
  );
};

export default Reject;