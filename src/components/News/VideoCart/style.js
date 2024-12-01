import styled from "styled-components";

export const Content = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  .video-cart-left {
    cursor: pointer;
    img {
      width: 287.5px;
      height: 249px;
      border-radius: 3px;
      object-fit: cover;
    }
  }
  .video-cart-right {
    &__date {
      display: flex;
      align-items: center;
      gap: 15px;
      color: var(--minDate);
    }
    &__title {
      color: var(--titleDark);
      font-size: 18px;
      font-weight: 700;
      padding: 5px 0;
    }
    &__desc {
      font-size: 16px;
      font-weight: 400;
      color: #808080;
    }
    &__button {
      background: transparent;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      color: var(--titleDark);
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
