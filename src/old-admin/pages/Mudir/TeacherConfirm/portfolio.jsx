import React from "react";
import Teachers from "./teachers";

const PortfolioConfirm = () => {
  return (
    <Teachers
      title="O'qituvchilarni Portfoliolarini tasdiqlash."
      url="/personportfolio/getallpersondatadepartment"
      edit="confirm-portfolio"
    />
  );
};

export default PortfolioConfirm;
