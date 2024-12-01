import React from "react";
import ConfirmComponent from "./confirm-component";

const PortfolioTable = () => {
  return (
    <ConfirmComponent
      title="O'qituvchilarni Portfoliolarini tasdiqlash."
      url="/personportfolio/getallpersonportfoliodep"
      con="/personportfolio"
    />
  );
};

export default PortfolioTable;
