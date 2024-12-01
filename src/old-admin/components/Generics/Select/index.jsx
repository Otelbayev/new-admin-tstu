import React from "react";
import { Select as S } from "antd";

const Select = ({
  options,
  label,
  value,
  className,
  onChange,
  defaultValue,
  showSearch,
  disabled,
  mode,
}) => {
  const filterOption = (input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  return (
    <div className={className}>
      {label && <label className="col-form-label">{label}</label>}
      <div className="col-sm-12">
        <S
          value={value}
          style={{ width: "100%", height: mode ? "auto" : "38px" }}
          defaultValue={defaultValue}
          onChange={onChange}
          showSearch={showSearch}
          optionFilterProp="label"
          filterOption={filterOption}
          disabled={disabled}
          mode={mode}
        >
          {options &&
            options.map(({ value, label }) => {
              return (
                <S.Option key={value} value={value} label={label}>
                  {label}
                </S.Option>
              );
            })}
        </S>
      </div>
    </div>
  );
};

export default Select;
