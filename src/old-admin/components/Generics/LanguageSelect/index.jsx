import React from "react";
import { Select } from "antd";
import { useLanguageContext } from "../../../../context/LanguageContext";

const LanguageSelect = ({ onChange }) => {
  const { options } = useLanguageContext();
  return (
    <div className="form-group">
      <div className="col-sm-12">
        <Select
          style={{ width: "100%", height: "40px" }}
          defaultValue={"uz"}
          onChange={onChange}
        >
          {options.map((e) => (
            <Select.Option key={e.code} value={e.code}>
              {e.title}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelect;
