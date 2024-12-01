import styled from "styled-components";

export const Content = styled.div`
  margin: 27px 0 50px;
  .title {
    color: var(--faq);
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 43px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 40px;
    &__left {
      border-radius: 4px;
      border: 1px solid var(--faqBorder);
      width: 35%;
      padding: 30px;
    }
    &__right {
      border-radius: 4px;
      border: 1px solid var(--faqBorder);
      width: 65%;
      padding: 30px;
      &__title {
        color: var(--faq);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        margin-bottom: 14px;
      }
      &__p {
        color: var(--faq);
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        text-transform: capitalize;
      }
    }
  }
  .pp {
    color: var(--faq);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  @media (max-width: 850px) {
    .content {
      flex-direction: column;
      gap: 10px;
      &__left {
        width: 100%;
      }
      &__right {
        width: 100%;
      }
    }
  }
`;
