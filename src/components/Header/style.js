import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const flex = css`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  background-color: var(--bgSidebar);
  position: relative;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $uni }) => ($uni ? "130px" : "55px")};
  padding: 7px 0;
  .logo-header {
    height: 40px;
  }
  @media (max-width: 1000px) {
    height: auto;
    padding: 11px 0;
  }
  @media (max-width: 500px) {
    .logo-header {
      height: 25px;
    }
  }
`;

export const Mobile = styled.div`
  display: none;

  @media screen and (max-width: 1000px) {
    display: block;
    transition: 0.5s;
    position: absolute;
    top: 112px;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    background: var(--bgSidebar);
    transform: ${({ $isopen }) =>
      $isopen === "false" ? "translateY(-1000px)" : "translateY(-500)"};
    visibility: ${({ $isopen }) => $isopen === "false" && "hidden"};
    left: 0;
    width: 100%;

    .ant-menu-sub,
    .ant-menu-inline {
      background: transparent !important;
    }
    .ant-menu-title-content {
      font-size: 14px !important;
    }
    .ant-menu-submenu-title {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0;
    }
    .ant-menu-submenu-title .ant-menu-title-content {
      font-weight: 600;
      color: #fff;
    }
    .ant-menu-item .ant-menu-title-content {
      padding-left: 10px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .ant-menu-submenu {
  padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin: 0 !important;
} 
.ant-menu-item {
  height: 40px !important;
  padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;

} 
.ant-menu-item-selected {
  background: none !important;
  color: #fff !important;
} 
.ant-menu-item-active {
  background: none !important;
  color: #fff !important;
}
    @media screen and (max-width: 500px) {
      top: 82px;
    }
  }
`;

export const Wrapper = styled.div`
  ${flex}
  justify-content: space-between;
`;

export const Left = styled.div`
  ${flex}
  gap:10px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
export const Div = styled.div`
  ${flex}
  gap:10px;
  img {
    height: 32px;
  }
  @media screen and (max-width: 500px) {
    img {
      height: 28px;
      width: auto;
    }
  }
`;
export const Img = styled.img`
  background: ${(props) => props.$last && "var(--white)"};
  border-radius: ${(props) => props.$last && "5px"};
  padding: ${(props) => props.$last && "2px"};
  height: 32px;
  @media screen and (max-width: 500px) {
    width: 129px;
  }
`;

export const Right = styled.div`
  .item-desktop {
    ${flex};
    gap: 15px;
  }

  .header-dropdown {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    gap: 10px;
  }
  @media screen and (max-width: 1000px) {
    .item-desktop {
      display: none;
    }
    .header-dropdown {
      display: block;
      width: 100%;
      background: transparent;
      color: #fff;
      border-right: none !important;
      & > li {
        border-bottom: 1px solid #a6a6a6;
        border-radius: 0;
      }
    }
  }
  @media screen and (max-width: 500px) {
    top: 92px;
  }
`;
export const Link = styled(NavLink)`
  ${flex}
  gap:4px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 18px;
  color: var(--white);
  text-decoration: none;
  @media screen and (max-width: 1100px) {
    font-size: 16px;
  }
  &:hover {
    color: #fff;
  }
`;

export const Menus = styled.div`
  width: 63px;
  display: none;
  width: 10%;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

export const Menu = styled.img`
  cursor: pointer;
  width: 25px;
`;

export const Language = styled.div`
  display: none;

  @media screen and (max-width: 1000px) {
    ${flex}
    justify-content: flex-end;
  }
`;
export const Icon = styled.img`
  width: ${({ x }) => x && "20px"};
  cursor: ${({ x }) => x && "pointer"};
  position: ${({ x }) => x && "absolute"};
  right: ${({ x }) => x && "30px"};
  display: ${({ x }) => x && "none"};
  @media screen and (max-width: 1000px) {
    display: ${({ x }) => x && "block"};
    width: 18px;
  }
`;

export const Select = styled.select`
  border: none;
  background: transparent;
  color: var(--white);
  outline: none;
  cursor: pointer;
  font-size: 16px;
`;

export const Search = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-weight: 400;
    font-size: 18px;
    color: var(--white);
    text-decoration: none;
    @media screen and (max-width: 1100px) {
      font-size: 16px;
    }
  }
`;

export const Desktop = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Line = styled.div`
  background: var(--titleLight);
  height: 2px;
  margin: 20px 0 10px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SearchBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : -1)};
  transition: 0.5s;
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "translateY(20px)" : "translateY(-200px)"};
  input {
    width: 100%;
    outline: none;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid var(--titleDark);
  }
`;
