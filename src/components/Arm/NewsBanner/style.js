import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  .news-img {
    width: 100%;
    height: 580px;
  }
  .news-abs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 580px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px 15px;
    gap: 20px;
    &__top {
      font-size: 16px;
      font-weight: 400;
      color: #fff;
    }
    &__title {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        text-shadow: 0 0 10px #fff;
      }
    }
    &__bottom {
      display: flex;
      gap: 20px;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
    }
  }
`;
