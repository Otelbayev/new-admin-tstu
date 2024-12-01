import styled from "styled-components";

export const Layout = styled.div`
  margin: 40px 0 20px;
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 300px 300px;
    gap: 8px;
    margin: 20px 0;
    &__item1 {
      grid-column: 1/3;
      grid-row: 1/2;
    }
    &__item2 {
      grid-column: 3/4;
      grid-row: 1/2;
    }
    &__item3 {
      grid-column: 4/5;
      grid-row: 1/2;
    }
    &__item4 {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    &__item5 {
      grid-column: 2/3;
      grid-row: 2/3;
    }
    &__item6 {
      grid-column: 3/5;
      grid-row: 2/3;
    }
  }
  @media (max-width: 950px) {
    .grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: 300px 300px 300px;
      &__item1 {
        grid-column: 1/5;
        grid-row: 1/2;
      }
      &__item2 {
        grid-column: 5/7;
        grid-row: 1/2;
      }
      &__item3 {
        grid-column: 1/4;
        grid-row: 2/3;
      }
      &__item4 {
        grid-column: 4/7;
        grid-row: 2/3;
      }
      &__item5 {
        grid-column: 1/3;
        grid-row: 3/4;
      }
      &__item6 {
        grid-column: 3/7;
        grid-row: 3/4;
      }
    }
  }
  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      gap: 5px;
      &__item1 {
        grid-column: 1/3;
        grid-row: 1/2;
      }
      &__item2 {
        grid-column: 1/3;
        grid-row: 2/3;
      }
      &__item3 {
        grid-column: 1/3;
        grid-row: 3/4;
      }
      &__item4 {
        grid-column: 1/3;
        grid-row: 4/5;
      }
      &__item5 {
        grid-column: 1/3;
        grid-row: 5/6;
      }
      &__item6 {
        grid-column: 1/3;
        grid-row: 6/7;
      }
    }
  }
`;
