import styled, { css } from "styled-components";
import arrow from "../../assets/icons/arrow-light.svg?react";

export const IlmiyMarkaz = styled.div`
  display: grid;
  padding: 54px 0;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
  @media (max-width: 996px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 660px) {
    grid-template-columns: 1fr;
  }
`;
export const Malumot = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
  padding: 50px 0;
`;
Malumot.Left = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 50%;
`;
Malumot.Img = styled.img`
  width: 100%;
  height: 230px;
  grid-row: ${({ $row }) => $row};
  grid-column: ${({ $col }) => $col};
`;
Malumot.Right = styled.div`
  width: 55%;
`;
Malumot.Div = styled.div`
  margin: 50px 0;
  .title {
    color: #1c1c1c;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .p {
    color: #585757;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
  }
`;
export const Orinbosar = styled.div`
  display: grid;
  row-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 0;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const KafedraWrap = styled.div`
  padding: 30px 0;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

export const Kafedra = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 10px 0;
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
Kafedra.Item = styled.div`
  width: 100%;
  background: ${({ $bg }) => `url(${$bg})`};
  background-repeat: no-repeat;
  min-height: 300px;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
`;
Kafedra.Content = styled.div`
  width: 100%;
  height: 50%;
  padding: 15px 18px;
  display: flex;
  align-items: end;
  color: var(--white);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
`;
Kafedra.Arrow = styled(arrow)``;

export const News = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 50px 0;
`;

const scrollStyle = css`
  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #d2d2d2;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--bgHover);
  }
  direction: rtl;
`;

News.Left = styled.div`
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 930px;
  overflow-y: auto;
  ${scrollStyle}
`;
News.Right = styled.div`
  grid-column: 2/4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 930px;
  overflow-y: auto;
  ${scrollStyle}
`;

export const Yonalish = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  @media (max-width: 825px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    justify-content: flex-start;
  }
`;

Yonalish.Left = styled.div`
  width: 50%;
  @media (max-width: 825px) {
    width: 100%;
  }
`;

Yonalish.Right = styled.div`
  width: 50%;
  @media (max-width: 825px) {
    width: 100%;
  }
`;

Yonalish.Title = styled.div`
  color: var(--titleDark);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  @media (max-width: 825px) {
    font-size: 20px;
  }
`;

export const Wrap = styled.div`
  position: relative;
  padding-top: 50px;
  @media (max-width: 700px) {
    .text {
      font-size: 14px;
    }
  }
`;
