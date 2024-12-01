import React from "react";
import Teachers from "./teachers";

const ExprienceConfirm = () => {
  return (
    <Teachers
      title="O'qituvchilarni Tadjribasini tasdiqlash."
      url="/personexperience/getallpersondatadepartment"
      edit="confirm-exprience"
    />
  );
};

export default ExprienceConfirm;
