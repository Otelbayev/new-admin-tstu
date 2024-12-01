import styled from "styled-components";

export const Container = styled.div`
  padding: 50px 0;
  .news-date {
    display: flex;
    align-items: center;
    gap: 50px;
    span {
      font-size: 16px;
      font-weight: 600;
      color: var(--minDate);
    }
  }
  .content {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--minDate);
    gap: 20px;
    padding: 20px 0;
    margin-bottom: 20px;
    &__left {
      flex: 3;
      &__img1 {
        width: 100%;
      }
      img {
        width: 100% !important;
        /* max-height: 700px; */
      }
      &__img2 {
        width: 400px;
      }
      &__wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px 0;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: #808080;
        line-height: 25px;
        padding: 10px 0;
      }
    }
    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 25px;
      img {
        width: 100%;
      }
    }
  }
  .newsid-bottom {
    display: flex;
    padding-top: 20px;
    gap: 20px;
  }
  @media (max-width: 1100px) {
    .content {
      &__left {
        flex: 3;
      }
      &__right {
        flex: 2;
      }
    }
    .newsid-bottom {
      flex-direction: column;
    }
  }
  @media (max-width: 850px) {
    .content {
      flex-direction: column;
      &__left {
        flex: 1;
      }
      &__right {
        width: 100%;
        flex: 1;
      }
    }
  }
  @media (max-width: 750px) {
    .content {
      &__left {
        &__img2 {
          width: 100%;
        }
        &__wrap {
          flex-direction: column;
        }
      }
    }
  }
`;
