import { Button } from "antd";
import React from "react";
import { ImEye } from "react-icons/im";

const Show = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="primary">
      <ImEye size={20} />
    </Button>
  );
};

export default Show;
