import React from "react";
import { Container } from "./style";

const Select = ({
  onChange,
  onSelect,
  height,
  options,
  defaultValue,
  disabled,
  children,
}) => {
  return (
    <Container
      onChange={onChange}
      onSelect={onSelect}
      height={height}
      options={options}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      {children}
    </Container>
  );
};

export default Select;
