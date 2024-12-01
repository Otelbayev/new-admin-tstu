import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      className,
      placeholder,
      type,
      defaultValue,
      minLength,
      maxLength,
      id,
      name,
      onChange,
      disabled,
      style,
      onFocus,
      value,
      min,
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className="col-sm-12 col-form-label">
            {label}
          </label>
        )}
        <div className="col-sm-12">
          <input
            ref={ref}
            className="form-control"
            id={id}
            name={name}
            placeholder={placeholder}
            style={style}
            type={type ? type : "text"}
            defaultValue={defaultValue}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            disabled={disabled}
            onFocus={onFocus}
            value={value}
            min={min}
          />
        </div>
      </div>
    );
  }
);

export default Input;
