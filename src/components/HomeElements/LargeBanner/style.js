import styled from "styled-components";
import lightArrow from "../../../assets/icons/arrow-light.svg?react";

export const Icons = styled.div``;
Icons.LightArrow = styled(lightArrow)``;

export const Large = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .ccontent {
    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: 0.3s;
      &--img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 10% 10%;
      }
    }
    &__abs {
      position: absolute;
      transition: 0.3s;
      bottom: ${({ $w }) => `-${$w}px`};
      left: 0;
      width: 100%;
      padding: 40px 10px 10px 10px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(9, 0, 41, 0.9) 50%,
        rgba(9, 0, 41, 0.9) 100%
      );
      &--date {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 5px;
        color: var(--titleLight);
        font-weight: 400;
        font-size: 15px;
        span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        @media (max-width: 600px) {
          font-size: 14px;
          gap: 5px;
          span {
            gap: 3px;
          }
        }
      }
      &--title {
        font-size: 19px;
        font-style: normal;
        width: fit-content;
        font-weight: 700;
        display: flex;
        align-items: center;
        color: var(--titleLight);
        position: relative;
        z-index: 1;
        cursor: pointer;
        display: inline-block;
        .bottom {
          transition: 0.3s;
          position: absolute;
          bottom: 4px;
          height: 8px;
          width: 100%;
          background: var(--btnBg);
          transform: skew(-30deg);
          z-index: -5;
          opacity: 0;
        }
      }
      &--desc {
        opacity: 0;
        font-family: "Poppins";
        color: #fdfdfd;
        padding-top: 20px;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: -0.03em;
        text-align: left;
        transition: 0.3s;
      }
    }
  }
  &:hover {
    .ccontent {
      &__bg {
        transform: scale(1.1);
      }
      &__abs {
        bottom: 0;
        &--desc {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .ccontent {
      height: 350px;
    }
  }
`;
