import { NavLink } from "react-router-dom";
import styled from "styled-components";

const setColor = (type) => {
  const obj = {
    dark: "var(--date)",
    light: "var(--titleLight)",
    primary: "var(--titleDark)",
  };
  return obj[type] || obj.light;
};

export const Container = styled.nav`
  position: absolute;
  bottom: -18px;
  transform: translateY(30px);
  z-index: 0;
  @media (max-width: 650px) {
    bottom: -5px;
  }
`;

export const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${(props) => setColor(props?.$breadcrumb)};
  @media (max-width: 650px) {
    gap: 5px;
  }
`;
export const Li = styled.li`
  list-style-position: inside;
  color: inherit;
  white-space: nowrap;
`;

export const Link = styled(NavLink)`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;
