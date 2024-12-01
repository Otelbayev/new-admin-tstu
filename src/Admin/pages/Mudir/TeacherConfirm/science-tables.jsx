import React from "react";
import ConfirmComponent from "./confirm-component";

const ScienceTable = () => {
  return (
    <ConfirmComponent
      title="O'qituvchilarni Ilmiy faoliyatini tasdiqlash."
      url="/personscientificactivity/getallpersonscientificactivitydep"
      con="/personscientificactivity"
      col={true}
    />
  );
};

export default ScienceTable;
