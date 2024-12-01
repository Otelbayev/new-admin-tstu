import styled from "styled-components";
import bggg from "../../../assets/images/bggggg.png";
import intIcon4 from "../../../assets/icons/intIcon4.svg?react";
import darkArrow from "../../../assets/icons/arrow-dark.svg?react";

export const Icons = styled.div``;

Icons.DarkArrow = styled(darkArrow)`
  transform: translateY(3px);
`;
Icons.Int4 = styled(intIcon4)`
  width: 75px;
  height: 75px;
`;

export const DarkSection = styled.div`
  padding: 50px 0 50px;
  background: url(${bggg});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const InteraktiveCarts = styled.div`
  margin-bottom: 20px;
  .first {
    background: var(--white);
    border-radius: 3px;
    margin: 50px 0 15px;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
    &__left {
      width: 35%;
      &__title {
        color: var(--titleDark);
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: 119%;
        cursor: pointer;
        text-decoration: none;
        display: block;
        margin-top: 20px;
      }
    }
    &__right {
      transform: translateY(-50px);
      display: flex;
      align-items: flex-end;
      width: 65%;
      &__macbook {
        max-width: 340px;
        max-height: 200px;
        height: 45%;
        width: 40%;
      }
      &__imac {
        max-width: 400px;
        height: 350px;
        width: 60%;
      }
    }
  }
  .second {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }
  @media only screen and (max-width: 1023px) {
    .first {
      padding: 20px;
      &__left {
        width: 50%;
        &__title {
          font-size: 25px;
          margin-top: 10px;
        }
      }
      &__right {
        transform: translateY(0);
        width: 50%;
        &__macbook {
          width: 40%;
          height: auto;
        }
        &__imac {
          width: 60%;
          height: auto;
        }
      }
    }
    .second {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 650px) {
    .first {
      flex-wrap: wrap;
      height: auto;
      gap: 30px;
      margin: 25px 0 10px;
      &__left {
        width: 100%;
        display: flex;
        &__title {
          padding-left: 20px;
          font-size: 20px;
        }
      }
      &__right {
        width: 100%;
      }
    }
    .second {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
`;
