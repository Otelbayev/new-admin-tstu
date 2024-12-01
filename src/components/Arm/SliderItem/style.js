import styled from "styled-components";

export const Content = styled.div`
  padding: 0 10px;
  margin: 20px 0;
  .slider-content {
    transition: 0.3s;
    display: flex;
    flex-direction: ${({ $reverse }) =>
      $reverse === "true" ? "column-reverse" : "column"};
    gap: 10px;
    cursor: pointer;
    &__img {
      width: 100%;
      height: 324px;
    }
    &__cart {
      padding: 10px;
      font-weight: 600;
      font-size: 24px;
      color: var(--titleDark);
      border: 1px solid #cecece;
      text-align: center;
      transition: 0.3s;
    }
  }
  &:hover {
    .slider-content {
      transform: translateY(-10px);
      &__cart {
        color: #fff;
        background: var(--titleDark);
      }
    }
  }
`;
