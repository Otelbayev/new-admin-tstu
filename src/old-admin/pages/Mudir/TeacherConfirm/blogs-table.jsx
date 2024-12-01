import React from "react";
import ConfirmComponent from "./confirm-component";

const BlogsTable = () => {
  return (
    <ConfirmComponent
      title="O'qituvchilarni Bloglarini tasdiqlash."
      url="/personblog/getallpersonblogdep"
      con="/personblog"
    />
  );
};

export default BlogsTable;
