import { NavLink } from "react-router-dom";
import styled from "styled-components";
import arrow from "../../../assets/icons/next.svg?react";

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position:absolute;
  top:-100px;
`;

Container.Item = styled.div``;
Container.Title = styled.div`
  color: var(--titleDark);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 10px;
`;
Container.Link = styled(NavLink)`
  color: #0046b7;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

Container.Icon = styled(arrow)`
  width: 20px;
  height: 20px;
`;
