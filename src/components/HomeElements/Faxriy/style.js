import styled from "styled-components";
import filter from "../../../assets/images/filterBg.png";

export const Container = styled.div`
  background: url(${filter});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  margin-top: 30px;
  .faxriyAbs__img {
    width: 100%;
    min-height: 600px;
  }
  .content {
    padding: 50px 0;
    text-align: center;
    &__img {
      width: 230px;
      height: 230px;
      border-radius: 50%;
      margin-bottom: 6px;
    }
    &__name {
      color: var(--white);
      text-align: center;
      font-size: 25px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 35px */
    }
    &__sub {
      color: var(--white);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
    }
    &__p {
      padding: 10px 20px;
      color: var(--white);
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 28px */
    }
  }
  @media only screen and (max-width: 1023px) {
    .faxriyAbs__img {
      width: 100%;
      min-height: 500px;
    }
    .content {
      &__img {
        width: 200px;
        height: 200px;
      }
      &__name {
        font-size: 22px;
      }
      &__sub {
        font-size: 17px;
      }
      &__p {
        font-size: 14px;
      }
    }
  }
  @media only screen and (max-width: 599px) {
    padding: 20px 0;
    .faxriyAbs__img {
      width: 100%;
      min-height: 470px;
    }
    .content {
      &__img {
        width: 156px;
        height: 156px;
      }
      &__name {
        font-size: 22px;
      }
      &__sub {
        font-size: 17px;
      }
      &__p {
        font-size: 14px;
        padding: 0;
      }
    }
  }
`;
