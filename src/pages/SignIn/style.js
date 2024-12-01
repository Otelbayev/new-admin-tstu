import styled, { css } from "styled-components";
import google from "../../assets/icons/google.svg?react";
import apple from "../../assets/icons/apple.svg?react";
import facebook from "../../assets/icons/facebook-dark.svg?react";

export const Content = styled.div`
  padding: 10px 0;
  height: calc(100vh - 122px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  @media (max-width: 950px) {
    flex-direction: column-reverse;
    height: auto;
    gap: 20px;
    margin: 20px 0;
  }
`;

Content.Left = styled.div`
  max-width: 424px;
  width: 95%;
`;
Content.Title = styled.div`
  color: #27272e;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  @media (max-width: 950px) {
    font-size: 22px;
  }
`;
Content.SubTitle = styled.div`
  color: #27272e;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-top: auto;
`;
Content.Form = styled.form`
  margin: 30px 0;
  @media (max-width: 950px) {
    margin: 10px 0;
  }
`;
Content.Label = styled.label`
  color: #425466;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  display: block;
  margin-bottom: 6px;
  @media (max-width: 950px) {
    font-size: 14px;
  }
`;
Content.Input = styled.input`
  width: 100%;
  outline: none;
  display: flex;
  height: 46px;
  padding: 14px 50px 16px 16px;
  align-items: center;
  align-self: stretch;
  border-radius: 6px;
  background: #edf2f7;
  border: 1px solid #edf2f7;
  &:focus {
    border: 1px solid #7a828a;
  }
  ${({ $error }) =>
    $error === "true" &&
    css`
      border: 1px solid red;
      background: rgba(255, 0, 0, 0.3);
    `}
  @media (max-width: 950px) {
    font-size: 14px;
    padding: 14px 16px;
  }
`;

Content.Forgot = styled.div`
  color: #777e90;
  text-align: right;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  cursor: pointer;
  margin-top: 8px;
`;
Content.None = styled.div`
  color: #777e90;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  margin-top: 8px;
`;
Content.Button = styled.button`
  color: #fcfcfd;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  background: var(--black);
  width: 100%;

  display: flex;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 90px;
  border: none;
  transition: transform 0.1s;
  ${({ $loading }) =>
    $loading === "true"
      ? css`
          opacity: 0.5;
        `
      : css`
          &:active {
            opacity: 0.9;
            transform: scale(0.98);
          }
        `}
`;
Content.Other = styled.div`
  color: #718096;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.08px;
  margin-bottom: 24px;
`;
Content.Media = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 37px;
`;
Content.Next = styled.div`
  margin-top: 10px;
  color: #718096;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  a {
    text-decoration: none;
    color: #141416;
  }
`;

Content.Right = styled.div`
  width: 50%;
  height: 100%;
  max-height: 600px;
  @media (max-width: 950px) {
    width: 60%;
    height: auto;
  }
`;
Content.Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  margin: 15px 0;
`;

export const Icons = styled.div``;

const iconStyle = `
border-radius: 26px;
border: 1px solid lightgray;
padding: 14px;
width: 52px;
height: 52px;
background: #fff;
box-shadow: 0px 1px 3px 0px rgba(50, 50, 71, 0.1),
  0px 0px 1px 0px rgba(12, 26, 75, 0.2);
`;

Icons.Google = styled(google)`
  ${iconStyle}
`;
Icons.Apple = styled(apple)`
  ${iconStyle}
`;
Icons.Facebook = styled(facebook)`
  ${iconStyle}
`;

Content.P = styled.label`
  color: #425466;
  font-size: 12px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  span {
    color: #425466;
    font-weight: 700;
  }
`;
