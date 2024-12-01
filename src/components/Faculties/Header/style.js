import styled from "styled-components";
import search from "../../../assets/ARM/search.svg?react";

export const Container = styled.div`
  background: #0056b1;
  height: 60px;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu {
    display: none;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 20px;
    .ul {
      display: flex;
      align-items: center;
      list-style-type: none;
      gap: 20px;
      margin: 0;
      .search {
        display: none;
      }
      .first i {
        display: none;
      }
    }
    .bg {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .menu {
      display: block;
      cursor: pointer;
    }
    .right {
      .ul {
        transition: 0.3s;
        position: fixed;
        transform: ${({ $isOpen }) =>
          $isOpen ? "translateX(0)" : "translateX(-100%)"};
        top: 0;
        left: 0;
        z-index: 99;
        padding: 20px;
        flex-direction: column;
        align-items: start;
        background: #0056b1;
        height: 100dvh;
        width: 70%;
        .first {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          i {
            display: block;
            color: #fff;
            font-size: 25px;
          }
        }
        .qidirish {
          display: none;
        }
        .search {
          display: block;
          width: 100%;
          input {
            padding: 5px;
            width: 100%;
            outline: none;
            border-radius: 3px;
            border: 2px solid #fff;
          }
        }
      }
      .bg {
        display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
        content: "";
        position: fixed;
        z-index: 1;
        cursor: pointer;
        top: 0;
        left: 0;
        width: 100%;
        height: 100dvh;
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }
  @media (max-width: 500px) {
    .logo {
      width: 140px;
      height: 40px;
    }
  }
`;

export const Link = styled.div`
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-family: "Inter";
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    color: #fff;
  }
`;

export const Search = styled(search)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
