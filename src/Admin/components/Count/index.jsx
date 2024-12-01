import React from "react";

const Count = ({ className }) => {
  return (
    <div className={className}>
      <div
        className="dataTables_info"
        id="example1_info"
        role="status"
        aria-live="polite"
      >
        Показано от 1 до 10 из 100 записей
      </div>
    </div>
  );
};

export default Count;
