import styled, { keyframes } from "styled-components";
import lightArrow from "../../assets/icons/arrow-light.svg?react";
export const Icons = styled.div``;
Icons.LightArrow = styled(lightArrow)``;

const anim = keyframes`
  from {
    bottom: 0;
  } to{
    bottom:-40px;
  }
`;

export const Contianer = styled.div`
  height: 440px;
  .item {
    cursor: pointer;
    transition: 0.4s;
    width: 100%;
    background: var(--white);
    height: 400px;
    position: relative;
    border-radius: 4px;
    border: ${({ $border }) => $border && `1px solid ${$border}`};
    overflow: hidden;
    &__img {
      width: 100%;
      height: 225px;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      transition: transform 0.3s;
      object-fit: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
    .bottom-back {
      background: #fff;
      transform: translateY(-6px);
    }
    &__title {
      padding: 16px 16px 8px 16px;
      color: var(--titleDark);
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: 133%;
    }
    &__p {
      color: var(--titleDark);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: -0.48px;
      padding: 0 16px 10px 16px;
      display: inline-block;
      max-width: 100%;
    }
    &__button {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0px 0px 3px 3px;
      background: linear-gradient(88deg, #0075ff 0.33%, #00b2ff 99.41%);
      color: var(--white);
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 19px; /* 118.75% */
      letter-spacing: -0.48px;
      opacity: 0;
      z-index: -1;
    }
    &:hover {
      height: 440px;
      .item__button {
        opacity: 1;
        z-index: 1;
      }
    }
  }
  @media (max-width: 776px) {
    height: 100%;
    .item {
      &__button {
        display: none;
      }
      &:hover {
        height: 400px;
      }
    }
  }
`;
