import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  .ant-select-selector {
    background: transparent !important;
  }
  .ant-select-selection-item {
    color: ${({ $mode }) => ($mode === "light" ? "#01426f" : "#fff")};
    font-weight: 700;
  }
  .ant-select-arrow {
    svg {
      fill: ${({ $mode }) => ($mode === "light" ? "#01426f" : "#fff")};
    }
  }
`;
