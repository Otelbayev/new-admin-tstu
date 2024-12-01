import React from "react";

const Show = ({ className }) => {
  return (
    <div className={className}>
      <div className="dataTables_length" id="example1_length">
        <label>
          Показать записей
          <select className="custom-select custom-select-sm form-control form-control-sm">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Show;
