import React from "react";

const Search = ({ className }) => {
  return (
    <div className={className}>
      <div id="example1_filter" className="dataTables_filter">
        <label>
          Поиск из таблиц
          <input type="search" className="form-control form-control-sm" />
        </label>
      </div>
    </div>
  );
};

export default Search;
