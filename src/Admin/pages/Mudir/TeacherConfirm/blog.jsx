import React from "react";
import Teachers from "./teachers";

const BlogConfirm = () => {
  return (
    <Teachers
      title="O'qituvchilarni Bloglarini tasdiqlash."
      url="/personblog/getallpersondatadepartment"
      edit="confirm-blog"
    />
  );
};

export default BlogConfirm;
