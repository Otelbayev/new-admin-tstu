import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid var(--borderCart);
  .mini-item-title {
    color: var(--titleDark);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
  }
  .mini-item-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    color: var(--minDate);
    font-weight: 400;
    font-size: 15px;
    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    @media (max-width: 600px) {
      font-size: 14px;
      gap: 5px;
      span {
        gap: 3px;
      }
    }
  }
`;
