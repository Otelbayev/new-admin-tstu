import styled from "styled-components";

export const Container = styled.input`
  margin: ${({ margin }) => margin};
  border: 1px solid #cad1e1;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "4px"};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "16px")};
  padding: ${({ $padding }) => ($padding ? $padding : "12px 15px")};
  outline: none;
  color: #363940;
  width: ${({ width }) => (width ? width : "100%")};
  &:focus {
    border: 1px solid #507cff;
  }
  &::placeholder {
    color: #95a1bb;
  }
`;
