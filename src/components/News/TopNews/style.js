import styled from "styled-components";

export const Container = styled.div`
  background: #1f2947;
  color: #ffff;
  padding: 20px;
  .content {
    &__title {
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 20px;
    }
    &__wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .active {
        color: cyan;
      }
      &__item {
        display: block;
        text-decoration: none;
        color: inherit;
        border-bottom: 1px solid #666;
        padding-bottom: 10px;
        font-size: 16px;
        transition: 0.3s;
        &:hover {
          color: cyan;
        }
      }
    }
    &__btn {
      background: transparent;
      display: block;
      text-align: center;
      color: #ffff;
      border: 1px solid #fff;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      font-weight: 400;
      margin-top: 20px;
      font-family: "Source Sans Pro";
      cursor: pointer;
    }
  }
`;
