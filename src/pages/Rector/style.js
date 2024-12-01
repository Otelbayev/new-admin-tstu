import styled from "styled-components";
import { Button } from "../../components/Generics";

export const Content = styled.div`
  margin: 50px 0;
  .content {
    display: flex;
    justify-content: space-between;
    &__left {
      width: 40%;
      height: 650px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__title {
        color: var(--black);
        font-size: 25.794px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        margin-bottom: 30px;
        &__span {
          color: var(--titleDark);
        }
      }
      &__img {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__right {
      width: 58%;
      &__top {
        display: flex;
        align-items: "center";
        justify-content: space-between;
        &__item {
          color: var(--titleDark);
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 140%;
          cursor: pointer;
        }
      }
      &__desc {
        color: var(--date);
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 140%;
        padding: 4px 0 30px;
      }
      &__form {
        display: flex;
        flex-direction: column;
        gap: 9px;
        &__item {
          display: flex;
          align-items: center;
          gap: 27px;
        }
      }
      .oferma {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        padding: 0px 20px;
        &__title {
          font-size: 18px;
          color: #333333;
          font-weight: 600;
          padding-bottom: 10px;
          border-bottom: 1px solid lightgray;
        }
        &__top {
          padding: 10px 0;
        }
        ul {
          padding: 10px 0;
        }
      }
    }
  }
  @media (max-width: 976px) {
    .content {
      flex-direction: column;
      &__left {
        width: 100%;
        height: auto;
        &__title {
          font-size: 22px;
        }
        &__img {
          text-align: center;
          img {
            width: 80%;
          }
        }
      }
      &__right {
        width: 100%;
        &__top {
          &__item {
            font-size: 18px;
          }
        }
      }
    }
  }
  @media (max-width: 500px) {
    .content {
      &__right {
        &__top {
          &__item {
            font-size: 15px;
          }
        }
        &__desc {
          font-size: 14px;
        }
      }
    }
  }
`;

export const Btn = styled(Button)`
  width: 126px;
  padding: 16px 32px;
  margin: 20px 0;
`;

export const Item = styled.div`
  opacity: ${({ type }) => (type === "true" ? 1 : 0.7)};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 19px;
  color: black;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  outline: none;
  border: 1px solid #cecece;
  border-radius: 4px;
  height: 113px;
  &:focus {
    border: 1px solid #007aff;
  }
`;
