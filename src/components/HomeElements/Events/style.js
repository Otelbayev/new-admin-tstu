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

export const Layout = styled.div`
  margin: 40px 0 20px;
  .grid {
    display: grid;
    grid-template-columns: 315px 1fr 1fr;
    grid-template-rows: 527px;
    grid-auto-flow: column;
    grid-gap: 7px;
    margin: 30px 0;
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 7px;
    }
    &__large {
      position: relative;

      &__img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    &__news {
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: scroll;
      height: 100%;
      padding-right: 5px;
      ${scrollStyle}
    }
    @media (max-width: 950px) {
      grid-template-columns: 1fr;
      grid-template-rows: 300px 400px 527px;
      &__item {
        flex-direction: row;
      }
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: 600px 600px 527px;
      &__item {
        flex-direction: column;
      }
      .first {
        order: 2;
      }
      .second {
        order: 1;
      }
      .thrid {
        order: 3;
      }
    }
  }
`;
