import React, { forwardRef } from "react";

const TextArea = forwardRef(
  (
    { value, label, id, name, placeholder, defaultValue, className, onChange },
    ref
  ) => {
    return (
      <div className={className}>
        <label className="col-sm-12 col-form-label">{label}</label>
        <div className="col-sm-12">
          <textarea
            ref={ref}
            className="form-control"
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
            style={{ minHeight: "90px" }}
          />
        </div>
      </div>
    );
  }
);

export default TextArea;
