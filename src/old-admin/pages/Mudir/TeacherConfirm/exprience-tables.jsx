import React from "react";
import ConfirmComponent from "./confirm-component";

const ExprienceTable = () => {
  return (
    <ConfirmComponent
      title="O'qituvchilarni Bloglarini tasdiqlash."
      url="/personexperience/getallpersonexperiencedep"
      con="/personexperience"
    />
  );
};

export default ExprienceTable;
