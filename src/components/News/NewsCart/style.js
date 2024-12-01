import styled from "styled-components";

export const Content = styled.div`
  border-radius: 3px;
  border: 1px solid var(--borderCart);
  overflow: hidden;
  cursor: pointer;
  transition: ease-out 0.2s;
  img {
    width: 100%;
    height: 248px;
    transition: transform 0.3s;
    object-fit: cover;
  }
  .news-cart-bottom {
    background-color: #fff;
    transform: translateY(-6px);
    padding: 15px;
    &__mintitle {
      color: var(--titleDark);
      font-weight: 500;
      font-size: 16px;
    }
    &__title {
      color: var(--titleDark);
      font-weight: 700;
      font-size: 18px;
      padding: 10px 0;
    }
    &__date {
      display: flex;
      align-items: center;
      gap: 15px;
      span {
        color: var(-- minDate);
      }
    }
  }
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.1) !important;
    }
  }
`;
