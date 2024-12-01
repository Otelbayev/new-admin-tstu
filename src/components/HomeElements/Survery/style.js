import styled from "styled-components";
import bggg from "../../../assets/images/bggggg.png";

export const DarkSection = styled.div`
  padding: 50px 0 50px;
  background: url(${bggg});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  .tadqiqot {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 50px 0;
    &__item {
      text-align: center;
      &__title {
        color: var(--titleLight);
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        padding-bottom: 10px;
        border-bottom: 2px solid #99d8ff;
      }
      &__count {
        color: var(--titleLight);
        font-size: 37px;
        font-style: normal;
        font-weight: 700;
        padding-top: 10px;
      }
      &__p {
        color: var(--white);
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 18.2px;
      }
    }
  }
  .markaz {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    transition: 0.4s;
    padding-top: 50px;
    gap: 8px;
  }
  @media only screen and (max-width: 1100px) {
    .markaz {
      grid-template-columns: 1fr 1fr;
      padding: 30px 0;
    }
  }
  @media only screen and (max-width: 560px) {
    .markaz {
      grid-template-columns: 1fr;
      padding: 15px 0;
    }
  }
  @media only screen and (max-width: 776px) {
    .tadqiqot {
      grid-template-columns: 1fr;
      border-top: 2px solid #99d8ff;
      border-bottom: 2px solid #99d8ff;
      padding: 20px 0;
      margin: 20px 0;
      gap: 15px;
      &__item {
        text-align: start;
        .mobile-flex {
          display: flex;
          gap: 10px;
        }
        &__title {
          padding-bottom: 0;
          border-bottom: 0;
          font-size: 22px;
        }
        &__count {
          padding-top: 0;
          font-size: 22px;
        }
        &__p {
          font-size: 14px;
        }
      }
    }
    .markaz {
      flex-direction: column;
      height: auto;
      justify-content: center;
      align-items: center;
    }
  }
`;
