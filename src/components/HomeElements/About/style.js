import icon1 from "../../../assets/icons/university-03.svg?react";
import icon2 from "../../../assets/icons/university-20.svg?react";
import icon3 from "../../../assets/icons/university-26.svg?react";
import icon4 from "../../../assets/icons/university-07.svg?react";
import icon5 from "../../../assets/icons/university-18.svg?react";
import icon6 from "../../../assets/icons/university-09.svg?react";
import bggg from "../../../assets/images/bggggg.png";
import styled, { css } from "styled-components";

export const Container = styled.div`
  background: url(${bggg});
  color: var(--white);
  text-align: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding: 37px 0 30px;
  .about {
    &__title {
      color: var(--titleLight);
      text-align: center;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
    }
    &__desc {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      padding: 20px 160px 0;
      color: var(--titleLight);
    }
    &__boxes {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      gap: 80px;
      &__box {
        &__count {
          color: var(--white);
          font-size: 23.771px;
          font-style: normal;
          font-weight: 500;
          line-height: 120%;
        }
        &__min {
          font-size: 12.678px;
          font-style: normal;
          font-weight: 400;
          line-height: 140%;
        }
      }
    }
    &__button {
      font-size: 16px;
      border-radius: 7px;
      padding: 7px 38px;
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 1023px) {
    .about {
      &__desc {
        padding: 10px 15px;
      }
      &__boxes {
        flex-wrap: wrap;
        margin: 0;
        gap: 0;
        &__box {
          width: 30%;
          margin: 20px 0;
        }
      }
    }
  }
  @media only screen and (max-width: 599px) {
    .about {
      display: flex;
      flex-direction: column;
      &__title {
        text-align: start;
        border-left: 3px solid var(--titleLight);
        padding-left: 8px;
        font-size: 22px;
        order: 1;
      }
      &__desc {
        text-align: start;
        order: 2;
        padding: 0;
        font-size: 16px;
        padding-top: 10px;
      }
      &__boxes {
        flex-wrap: wrap;
        margin: 0;
        order: 4;
        gap: 0;
        &__box {
          text-align: center;
          width: 50%;
          margin: 15px 0;
        }
      }
      &__button {
        order: 3;
        display: inline-block;
        width: 165px;
        font-size: 12px;
        padding: 5px;
        margin-top: 20px;
      }
    }
  }
`;

export const Icons = styled.div``;
const iconStyle = css`
  margin-bottom: 14px;
  width: 70px;
  height: 70px;
  @media only screen and (min-width: 600px) and (max-width: 1023px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0px;
  }
`;
Icons.Icon1 = styled(icon1)`
  ${iconStyle}
`;
Icons.Icon2 = styled(icon2)`
  ${iconStyle}
`;
Icons.Icon3 = styled(icon3)`
  ${iconStyle}
`;
Icons.Icon4 = styled(icon4)`
  ${iconStyle}
`;
Icons.Icon5 = styled(icon5)`
  ${iconStyle}
`;
Icons.Icon6 = styled(icon6)`
  ${iconStyle}
`;
