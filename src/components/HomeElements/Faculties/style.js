import styled, { css } from "styled-components";

const scrollStyle = css`
  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #d2d2d2;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--bgHover);
  }
`;

export const Fakultetlar = styled.div`
  margin: 50px 0;
`;
export const FakGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 12px;
  height: 530px;
  margin: 30px 0;
  .fak-left {
    grid-column: 1 / 3;
    overflow-y: auto;
    direction: rtl;
    margin: 0;
    ${scrollStyle}
    &__content {
      direction: ltr;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .wrap {
    grid-column: 3 / 6;
    overflow-y: auto;
    padding-right: 5px;
    ${scrollStyle}
    .fak-right {
      border-radius: 3px;
      background: var(--fakBg);
      min-height: 530px;
      padding: 18px;
      &__title {
        margin-bottom: 20px;
        color: var(--fakColor);
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        text-align: center;
        line-height: 140%;
      }
      &__cards {
        cursor: pointer;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 15px;
      }
    }
  }
  @media only screen and (max-width: 1023px) {
    height: 750px;
    grid-template-columns: 1fr;
    .fak-left {
      grid-column: 1/2;
    }
    .wrap {
      grid-column: 1/2;
    }
  }
  @media only screen and (max-width: 599px) {
    grid-template-rows: 2fr 3fr;
    height: 900px;
    .fak-left {
      &__content {
        padding-left: 5px;
        &__item {
          &__title {
            font-size: 16px;
          }
        }
      }
    }
    .wrap {
      padding-right: 5px;
      .fak-right {
        padding: 10px;
        &__cards {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
`;
