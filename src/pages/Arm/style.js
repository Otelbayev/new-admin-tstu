import styled, { css, keyframes } from "styled-components";
import bg from "../../assets/ARM/bg.png";
import first from "../../assets/ARM/kutubxona.svg?react";
import second from "../../assets/ARM/baza.svg?react";
import thrid from "../../assets/ARM/kurs.svg?react";
import fourth from "../../assets/ARM/adabiyot.svg?react";
import fifth from "../../assets/ARM/udk.svg?react";
import sixth from "../../assets/ARM/madaniyat.svg?react";
import { Button } from "../../components/Generics";
export const Showcase = styled.div`
  background: url(${bg});
  background-position: 30px;
  background-size: cover;
`;

export const Content = styled.div`
  height: 100%;
  height: calc(100dvh - 80px);
  display: flex;
  align-items: center;
`;

Content.Title = styled.div`
  color: #fff;
  font-size: 46px;
  width: 60%;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 700px) {
    font-size: 36px;
    width: 100%;
  }
`;

Content.Btn = styled(Button)`
  padding: 15px 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-top: 22px;
  @media (max-width: 700px) {
    font-size: 16px;
    padding: 10px;
  }
`;

export const Wrap = styled.div`
  margin: 130px 0 0;
`;

export const Service = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  @media (max-width: 920px) {
    flex-direction: column;
    gap: 20px;
    margin: 10px 0;
  }
`;

Service.Left = styled.div`
  flex: 3;
`;
Service.LeftItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-top: 20px;
  @media (max-width: 920px) {
    margin-top: 10px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
Service.Cart = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
Service.Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: var(--titleDark);
`;
Service.Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #a6a6a6;
`;
Service.Right = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Icons = styled.div``;

const iconStyle = css`
  width: 90px;
  height: 90px;
`;

Icons.First = styled(first)`
  ${iconStyle}
`;
Icons.Second = styled(second)`
  ${iconStyle}
`;
Icons.Thrid = styled(thrid)`
  ${iconStyle}
`;
Icons.Fourth = styled(fourth)`
  ${iconStyle}
`;
Icons.Fifth = styled(fifth)`
  ${iconStyle}
`;
Icons.Sixth = styled(sixth)`
  ${iconStyle}
`;

export const Tadbirlar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  row-gap: 20px;
  margin: 20px 0;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const News = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 50px 0;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

News.Left = styled.div`
  flex: 1;
`;
News.Right = styled.div`
  flex: 1;
`;

export const VideoBanner = styled.div`
  position: relative;
  height: 600px;
  margin: 40px 0;
  .abs-video-banner {
    width: 100%;
    height: 100%;
  }
`;

const anim = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.1);
  }
`;

VideoBanner.Abs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    270deg,
    rgba(0, 41, 79, 0.0001) 0%,
    rgba(0, 41, 79, 0.688529) 70.25%,
    #00294f 90%
  );
  .video-banner-content {
    display: flex;
    height: 600px;
    align-items: center;
    &__left {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 100px;
      &__title {
        font-size: 32px;
        font-weight: 700;
        color: #fff;
      }
      &__acc {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        &__name {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
        }
        &__position {
          font-size: 16px;
          font-weight: 400;
          color: #fff;
        }
      }
      &__desc {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
      }
    }
    &__right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      img {
        animation: ${anim};
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        cursor: pointer;
      }
    }
  }
`;

export const Books = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 20px;
  margin: 50px 0;
`;

export const Audios = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 266px 266px 266px;
  grid-gap: 20px;
  margin: 50px 0;
`;
