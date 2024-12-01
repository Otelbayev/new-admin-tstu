import styled from "styled-components";
import user from "../../../assets/ARM/user.svg?react";
import calendar from "../../../assets/ARM/calendar.svg?react";

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .video-cart-left {
    img {
      width: 187.5px;
      height: 187.6px;
    }
  }
  .video-cart-right {
    &__date {
      display: flex;
      align-items: center;
      gap: 15px;
      span {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        font-weight: 400;
        color: var(--minDate);
      }
    }
    &__title {
      color: var(--titleDark);
      font-size: 18px;
      font-weight: 700;
      padding: 5px 0;
    }
    &__desc {
      font-size: 16px;
      font-weight: 400;
      color: #808080;
    }
    &__button {
      background: transparent;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      color: var(--titleDark);
    }
  }
  @media (max-width: 500px) {
    .video-cart-left {
      img {
        width: 130px;
        height: 130px;
      }
    }
    .video-cart-right {
      &__date {
        gap: 5px;
        span {
          font-size: 12px;
          gap: 2px;
        }
      }
      &__title {
        font-size: 18px;
      }
      &__desc {
        font-size: 14px;
      }
    }
  }
`;

export const Icon = styled.div;

Icon.User = styled(user)`
  @media (max-width: 500px) {
    width: 15px;
    height: 15px;
  }
`;
Icon.Calendar = styled(calendar)`
  @media (max-width: 500px) {
    width: 15px;
    height: 15px;
  }
`;
