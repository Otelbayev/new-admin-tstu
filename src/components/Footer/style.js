import { NavLink } from "react-router-dom";
import styled from "styled-components";
import bg from "../../assets/images/footer.png";
import mobil from "../../assets/images/mobilBg.png";
import youtube from "../../assets/icons/youtube.svg?react";
import instagram from "../../assets/icons/instagram.svg?react";
import telegram from "../../assets/icons/telegram.svg?react";
import facebook from "../../assets/icons/facebook.svg?react";

export const Social = styled.div``;

Social.Youtube = styled(youtube)``;
Social.Instagram = styled(instagram)``;
Social.Telegram = styled(telegram)``;
Social.Facebook = styled(facebook)``;

export const Container = styled.div`
  background: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 372px;
  @media (max-width: 850px) {
    height: 100%;
    background: url(${mobil});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  @media (max-width: 1100px) {
    gap: 0px;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    padding: 20px 20px;
    gap: 20px;
  }
`;

export const Left = styled.div`
  width: 320px;
  @media (max-width: 850px) {
    width: 100%;
  }
`;
export const Title = styled.div`
  color: var(--white);
  font-size: 30.445px;
  font-style: normal;
  font-weight: 600;
  white-space: nowrap;
  line-height: normal;
  margin-bottom: 25px;
  @media (max-width: 850px) {
    font-size: 22px;
    margin-bottom: 15px;
  }
`;
export const Icons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  @media (max-width: 850px) {
    margin-bottom: 15px;
  }
`;

export const P = styled.p`
  color: var(--white);
  font-size: 14.461px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin-bottom: 12px;
  max-width: 350px;
`;
export const Media = styled.div`
  display: flex;
  gap: 34px;
`;

export const Right = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 300px);
  gap: 20px;
  @media (max-width: 850px) {
    width: 100%;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ first }) => (first ? "14px" : "8px")};
  width: 200px;
  @media (max-width: 850px) {
    gap: ${({ first }) => (first ? "10px" : "5px")};
  }
  .bbtn {
    a {
      padding: 5px;
      align-items: center;
      background: transparent;
      border-radius: 4.017px;
      border: 0.803px solid var(--white);
      white-space: nowrap;

      color: var(--white);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 4px;

  color: var(--white);
  font-size: 16.068px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
  @media (max-width: 850px) {
    font-size: 12px;
  }
`;
export const T = styled.div`
  color: var(--white);
  margin-bottom: 7px;
  font-size: 19.281px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 850px) {
    font-size: 14px;
  }
`;
export const I = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
  @media (max-width: 850px) {
    width: 15px;
    height: 15px;
  }
`;

export const Btn = styled.button`
  border: none;
  background: transparent;
  a {
    padding: 5px;
    align-items: center;
    background: transparent;
    border-radius: 4.017px;
    border: 0.803px solid var(--white);
    white-space: nowrap;

    color: var(--white);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  @media (max-width: 850px) {
    font-size: 12px;
  }

  cursor: pointer;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .a {
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #fff;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 20px;
    }
  }
`;
