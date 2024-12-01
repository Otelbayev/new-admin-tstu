import { Skeleton } from "antd";
import React from "react";

const Loading2 = () => {
  return (
    <div className="root-container">
      <div className="root-wrapper my-5">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    </div>
  );
};

export default Loading2;
