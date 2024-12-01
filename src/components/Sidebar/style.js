import styled, { css } from "styled-components";
import arrowDown from "../../assets/icons/down.svg?react";
import arrowUp from "../../assets/icons/up.svg?react";
import menu from "../../assets/icons/menu.svg?react";

export const Wrapper = styled.div`
  height: 50px;
  margin-top: ${({ $uni }) => !$uni && "30px"};
  .top {
    display: flex;
    align-items: end;
    justify-content: space-between;
    .top-menu {
      display: flex;
      gap: 5px;
    }
    .top-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

export const Item = styled.div`
  transition: 0.3s;
  color: ${({ $hover }) => ($hover ? "var(--titleDark)" : "#fff")};
  background-color: ${({ $hover }) => ($hover ? "#fff" : "")};
  display: flex;
  gap: 5px;
  font-size: 18.25px;
  font-family: "Source Sans Pro";
  font-weight: 500;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  padding: 5px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  ${({ $hover }) =>
    $hover
      ? css`
          background-color: #fff;
          color: var(--titleDark);
        `
      : css`
          &:hover {
            background-color: "";
            color: #fff;
          }
        `}

  &:hover {
    border-bottom: 1px solid #fff;
  }
`;

export const Icons = styled.div``;

Icons.Arrow = styled(arrowUp)`
  width: 10px !important;
  height: 10px !important;
`;
Icons.Arrow1 = styled(arrowDown)`
  width: 10px !important;
  height: 10px !important;
`;

Icons.Menu = styled(menu)`
  cursor: pointer;
`;
