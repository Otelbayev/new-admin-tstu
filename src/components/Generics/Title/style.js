import styled, { keyframes } from "styled-components";
import darkArrow from "../../../assets/icons/arrow-dark.svg?react";
import lightArrow from "../../../assets/icons/arrow-light.svg?react";
import { NavLink } from "react-router-dom";

export const Light = styled(lightArrow)``;

export const Wrap = styled.div``;

export const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  transition: 0.5s;
`;

Content.Title = styled.div`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 46.8px;
  color: ${(props) =>
    props.$type === "dark"
      ? "var(--titleLight)"
      : props.$type === "light"
      ? "var(--titleDark)"
      : "#202020"};
  padding-left: ${({ $border }) => ($border === "none" ? 0 : "10px")};
  border-left: ${({ $type, $border }) =>
    $type === "dark"
      ? `${$border === "none" ? "0" : "3px"} solid var(--titleLight)`
      : `${$border === "none" ? "0" : "3px"} solid var(--bgHover)`};
  @media screen and (max-width: 1023px) {
    font-size: 24px;
  }
`;

export const Component = styled.div`
  display: ${({ display }) => (display === "bottom" ? "none" : "block")};
  @media (max-width: 700px) {
    display: ${({ display }) => (display === "top" ? "none" : "flex")};
  }
`;

Content.Button = styled("button")`
  font-family: "Source Sans Pro", sans-serif;
  background: transparent;
  border: none;
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 18.2px;
  position: relative;
  padding: 0 5px;
  z-index: 0;
  cursor: pointer;
  display: ${({ display }) => (display === "bottom" ? "none" : "flex")};
  align-items: center;
  gap: 1px;
  color: ${(props) =>
    props.$type === "dark"
      ? "var(--titleLight)"
      : props.$type === "light"
      ? "var(--titleDark)"
      : "#202020"};
  .abs {
    position: absolute;
    right: 0;
    top: 45%;
    transform: translateY(-50%);
    height: 25px;
    bottom: 0;
    width: 100%;
    background: var(--btnBg);
    z-index: -1;
    transition: 0.5s;
  }
  .arrow {
    opacity: 0;
  }
  &:hover {
    .abs {
      width: 0px;
      border-radius: 2px;
    }
    .arrow {
      opacity: 1;
    }
  }
  @media screen and (max-width: 1023px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    display: ${({ display }) => (display === "top" ? "none" : "flex")};
  }
`;

Content.SubTitle = styled.div`
  color: ${(props) =>
    props.$type === "dark" ? "var(--titleLight)" : "var(--titleDark)"};
  font-size: 20px;
  margin-top: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  @media screen and (max-width: 1023px) {
    font-size: 15px;
  }
`;
