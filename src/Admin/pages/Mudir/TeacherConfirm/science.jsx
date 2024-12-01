import React from "react";
import Teachers from "./teachers";

const ScienceConfirm = () => {
  return (
    <Teachers
      title="O'qituvchilarni Ilmiy faoliyatini tasdiqlash."
      url="/personscientificactivity/getallpersondatadepartment"
      edit="confirm-science"
    />
  );
};

export default ScienceConfirm;
