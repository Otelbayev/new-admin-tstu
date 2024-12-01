import { Button } from "antd";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const Confirm = ({ onClick }) => {
  return (
    <Button
      style={{
        backgroundColor: "green",
        color: "white",
        margin: "0 5px",
      }}
      onClick={onClick}
    >
      <IoMdCheckmark size={20} />
    </Button>
  );
};

export default Confirm;
