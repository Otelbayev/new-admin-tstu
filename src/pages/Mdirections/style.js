import styled from "styled-components";

export const Content = styled.div`
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    .radio-title {
      font-size: 16px;
    }
    button {
      border: 1px solid var(--darkBg);
      padding: 5px 10px;
      background: #fff;
      transition: 0.3s;
      color: var(--darkBg);

      &:hover {
        box-shadow: 0 0 5px var(--darkBg);
      }
    }
    .active {
      background: var(--darkBg);
      color: #fff;
    }
  }
  .dep {
    margin-top: 50px;
    &__item {
      margin: 10px 0;
      padding: 20px 40px;
      border: 1px solid lightgray;
      box-shadow: 0 0 5px lightgray;
      border-radius: 5px;
      &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__title {
          font-size: 26px;
        }
        button {
          background: var(--darkBg);
          color: #fff;
          border: none;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 16px;
        }
        & + div {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 10px 0;
          span {
            color: var(--darkBg);
          }
        }
      }
      &__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__item {
          border-left: 2px solid lightgray;
          padding-left: 10px;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .dep {
      &__item {
        &__top {
          & + div {
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
          }
        }
        &__bottom {
          flex-direction: column;
          align-items: flex-start;
          &__item {
            border-left: none;
            padding-left: 0;
            display: flex;
            gap: 10px;
          }
          .tit::after {
            content: ":";
          }
        }
      }
    }
  }
`;
