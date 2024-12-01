import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../components/Generics";
import arrow from "../../../assets/ARM/SVG.svg";
import search from "../../../assets/ARM/search.svg?react";
import menu from "../../../assets/icons/menu1.svg?react";

export const Container = styled.div`
  background: #0056b1;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  height: ${({ type }) => (type === "header" ? "80px" : "114px")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Content.Logo = styled.img`
  width: 98px;
  height: 68px;
`;

Content.Link = styled(NavLink)`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    color: #fff;
  }
`;

Content.Right = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  & > div {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  @media (max-width: 1200px) {
    gap: 20px;
    & > div {
      gap: 10px;
    }
  }
`;

Content.Btn = styled(Button)`
  padding: 10px 26px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

Content.Search = styled(search)`
  cursor: pointer;
`;

Content.Menu = styled(menu)`
  cursor: pointer;
  margin-right: 30px;
`;
