import styled from "styled-components";

export const Content = styled.div`
  .content {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    cursor: pointer;
    transition: 0.3s;
    &__left {
      background: #cceeff80;
      border-right: 4px solid #fff;
      padding: 5px 10px;
      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
      }
    }
    &__right {
      transition: 0.3s;
      background: #cceeff80;
      background: ${({ selected }) =>
        selected === true ? "var(--bgHover)" : "#cceeff80"};
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      &__title {
        transition: 0.3s;
        font-size: 18px;
        font-weight: 600;
        color: ${({ selected }) =>
          selected === true ? "#fff" : "var(--fakColor)"};
      }
    }
  }
`;
