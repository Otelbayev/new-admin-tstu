import React from "react";
import { Select } from "antd";
import { useLanguageContext } from "../../../../context/LanguageContext";

const LanguageSelect = ({ onChange }) => {
  const { options } = useLanguageContext();

  return (
    <Select style={{ width: "100%" }} defaultValue={"uz"} onChange={onChange}>
      {options.map((e) => (
        <Select.Option key={e.code} value={e.code}>
          {e.title}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
