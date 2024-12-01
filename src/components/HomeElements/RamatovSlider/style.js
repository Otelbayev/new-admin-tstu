import styled from "styled-components";

export const Container = styled.div`
  .item {
    padding: 0 10px;
    &__content {
      height: 170px;
      background: #e9e9e9;
      padding: 5px 10px;
      .slider-top {
        display: flex;
        align-items: center;
        gap: 8px;
        img {
          width: 85px;
          height: 85px;
        }
        &__name {
          color: #01426f;
          font-size: 17px;
          font-style: normal;
          font-weight: 600;
          line-height: 110%;
        }
        &__position {
          color: #03356c;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 110%;
          margin-top: 10px;
        }
      }
      .slider-bottom {
        color: #03356c;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
        margin-top: 10px;
      }
      transition: 0.3s;
      &:hover {
        background: var(--darkBg);
        .slider-top {
          &__name {
            color: var(--white);
          }
          &__position {
            color: var(--white);
          }
        }
        .slider-bottom {
          color: #fff !important;
          span {
            color: #fff !important;
          }
        }
      }
    }
  }
`;
