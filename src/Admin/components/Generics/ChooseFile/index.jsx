import React, { forwardRef } from "react";

const ChooseFile = forwardRef(({ label, className, onChange, value }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor="img" className="col-form-label">
          {label}
        </label>
      )}
      <div className="col-sm-12">
        <input
          type="file"
          className="form-control"
          id="img"
          name="img"
          style={{ padding: 2 }}
          ref={ref}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
});

export default ChooseFile;
