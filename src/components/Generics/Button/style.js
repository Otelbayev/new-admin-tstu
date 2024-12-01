import styled from "styled-components";

const Color = ({ type }) => {
  switch (type) {
    case "primary":
      return {
        background: "#507CFF",
        color: "var(--white)",
      };
    case "submit":
      return {
        background: "#507CFF",
        color: "var(--white)",
      };
  }
};

export const Container = styled.button`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "14px")};
  font-weight: ${({ weight }) => (weight ? weight : 500)};
  padding: ${({ $padding }) => ($padding ? $padding : "10px")};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : "5px")};
  border: none;
  cursor: pointer;
  ${Color}
  font-family: 'Poppins', sans-serif;
  &:active {
    opacity: 0.8;
  }
  &:hover {
    background: #4368dc;
  }
  @media (max-width: 700px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;
