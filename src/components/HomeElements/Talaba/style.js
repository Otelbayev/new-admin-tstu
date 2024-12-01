import styled from "styled-components";

export const Container = styled.div`
  margin: 50px 0;
`;

export const Layout = styled.div`
  margin: 40px 0 20px;
  .flex {
    display: grid;
    margin: 20px 0;
    grid-template-rows: 300px 300px;
    gap: 10px;
    &__item1 {
      grid-column: 1/3;
    }
    &__item2 {
      grid-column: 3/4;
    }
    &__item3 {
      grid-column: 4/5;
    }
    &__item4 {
      grid-column: 1/2;
    }
    &__item5 {
      grid-column: 2/3;
    }
    &__item6 {
      grid-column: 3/5;
    }
    @media (max-width: 900px) {
      grid-template-rows: repeat(3, auto);
      &__item1 {
        grid-column: 1/2;
      }
      &__item2 {
        grid-column: 2/3;
      }
      &__item3 {
        grid-column: 1/2;
      }
      &__item4 {
        grid-column: 2/3;
      }
      &__item5 {
        grid-column: 1/2;
      }
      &__item6 {
        grid-column: 2/3;
      }
    }
    @media (max-width: 650px) {
      grid-template-rows: 300px auto auto 300px auto auto;
      &__item1 {
        grid-column: 1/2;
        order: 1;
      }
      &__item2 {
        grid-column: 1/2;
        order: 2;
      }
      &__item3 {
        grid-column: 1/2;
        order: 3;
      }
      &__item4 {
        grid-column: 1/2;
        order: 6;
      }
      &__item5 {
        grid-column: 1/2;
        order: 5;
      }
      &__item6 {
        grid-column: 1/2;
        order: 4;
      }
    }
  }
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
  .next {
    position: absolute;
    right: 0;
    bottom: 20px;
    background: var(--bgHover);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .student {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20px;
    bottom: 0;
    top: 0;
    left: 0;
    &__img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      margin-bottom: 17px;
    }
    &__name {
      color: var(--white);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 18.2px; /* 91% */
    }
    &__group {
      color: var(--white);
      text-shadow: 0px 2px 12px var(--black);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 18.2px; /* 113.75% */
    }
    &__p {
      margin-top: 10px;
      color: var(--white);
      text-shadow: 0px 2px 12px var(--black);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 18.2px;
    }
  }
`;
