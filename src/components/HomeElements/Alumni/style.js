import styled from "styled-components";
import filter from "../../../assets/images/filterBg.png";

export const Ramatov = styled.div`
  background: url(${filter});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .content {
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
      line-height: 140%;
    }
    &__sub {
      color: var(--white);
      text-align: center;
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
      line-height: 140%;
      span {
        color: #fff !important;
      }
    }
  }
  .slider {
    padding: 20px 0;
  }
  @media only screen and (max-width: 1023px) {
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
