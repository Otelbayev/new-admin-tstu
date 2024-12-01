import styled from "styled-components";

export const Content = styled.div`
  .content {
    &__item {
      display: flex;
      align-items: center;
      margin: 30px 0;
      gap: 50px;
      &__img {
        width: 50%;
        border-radius: 10px;
      }
      &__data {
        width: 50%;
        &__fio {
          color: #01426f;
          font-size: 30px;
          font-weight: 700;
          line-height: 40px;
        }
        &__position {
          font-size: 18px;
          font-weight: 600;
          color: #173261;
        }
        &__ul {
          li {
            color: #173261;
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
    @media (max-width: 1000px) {
      &__item {
        align-items: flex-start;
        &__img {
          width: 40%;
        }
        &__data {
          width: 60%;
        }
      }
    }
    @media (max-width: 700px) {
      padding: 15px;
      &__item {
        gap: 10px;
        &__img {
          width: 100%;
        }
        &__data {
          width: 100%;
          &__fio {
            font-size: 20px;
            line-height: 24px;
          }
          &__position {
            font-size: 16px;
          }
          &__ul {
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
`;

export const Item = styled.div`
  flex-direction: ${({ id }) => (id % 2 === 0 ? "row" : "row-reverse")};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
