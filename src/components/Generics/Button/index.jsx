import React from "react";
import { Container } from "./style";

const Button = ({
  children,
  width,
  height,
  $padding,
  margin,
  type,
  fontSize,
  radius,
  className,
  onClick,
}) => {
  return (
    <Container
      width={width}
      height={height}
      $padding={$padding}
      margin={margin}
      type={type}
      fontSize={fontSize}
      radius={radius}
      className={className}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

export default Button;
