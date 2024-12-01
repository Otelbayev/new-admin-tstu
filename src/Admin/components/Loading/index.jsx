import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <section className="content">
          <div className="container-fluid">
            <Spin size="large" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Loading;
