import styled from "styled-components";

export const News = styled.div`
  padding: 13px 17px;
  border-radius: 1px;
  border: 1px solid #e5e7eb;
  background: var(--grayBg);
  display: flex;
  position: relative;
  .item-left {
    display: flex;
    flex-direction: column;
    color: var(--titleDark);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    font-size: 24px;
    padding: 11px;
    border-right: 1px solid var(--date);

    .dek {
      font-size: 15px;
    }
  }
  .item-center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 15px;
    &__title {
      color: var(--titleDark);
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
    }
    &__subtitle {
      color: var(--date);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 110%;
      text-transform: capitalize;
    }
  }
  .item-right {
    position: absolute;
    right: 15px;
    top: 15px;
    &__link {
      color: var(--bgHover);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 110%;
      text-transform: capitalize;
      text-decoration: none;
    }
  }
`;
