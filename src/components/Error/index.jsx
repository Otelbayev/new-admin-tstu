import { Button, Result } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error = () => {
  const { i18n } = useTranslation();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to={`/${i18n.language}`}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default Error;
