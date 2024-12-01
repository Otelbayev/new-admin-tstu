import styled from "styled-components";

// export const Wrap = styled.div`
//   cursor: pointer;
//   height: 100%;
//   background: #fff;
//   border-radius: 4px;
// border: 1px solid var(--date);
// background: var(--titleLight);
//   overflow: hidden;
//   @media (max-width: 650px) {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
// `;

// Wrap.Img = styled.div`
//   height: 60%;
//   background: ${({ src }) => `url(${src})`};
//   background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   transition: 0.3s;
//   @media (max-width: 650px) {
//     width: 45%;
//     height: 100%;
//   }
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// Wrap.Content = styled.div`
// background: #fff;
// padding: 5px 18px;
// display: flex;
// flex-direction: column;
// gap: 15px;
// @media (max-width: 650px) {
//   padding: 20px;
//   width: 55%;
// }
// `;

// Wrap.Date = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   .left {
//     color: var(--bgHover);
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 140%;
//   }
//   .date {
//     color: var(--minDate);
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 140%;
//     white-space: nowrap;
//   }
// `;

// Wrap.Title = styled.span`
// color: var(--titleDark);
// font-size: 17px;
// font-style: normal;
// font-weight: 700;
//   .icon {
//     margin-left: 5px;
//   }
// `;

export const Wrap = styled.div`
  height: 100%;
  cursor: pointer;
  .ccontent {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: var(--titleLight);
    height: 100%;
    overflow: hidden;
    &__image {
      height: 67%;
      position: relative;
      transition: 0.3s;
      &--img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    &__bottom {
      background: var(--titleLight);
      height: 33%;
      padding: 10px 10px 5px;
      transform: translateY(-10px);
      &--date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          color: var(--bgHover);
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 140%;
        }
        .date {
          color: var(--minDate);
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 140%;
          white-space: nowrap;
        }
      }
      &--title {
        color: var(--titleDark);
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        padding-top: 10px;
      }
    }
  }

  @media screen and (max-width: 700px) {
    height: 100%;
    min-height: 120px;
    .ccontent {
      display: flex;
      height: 100%;
      &__image {
        height: 100%;
        width: 40%;
      }
      &__bottom {
        width: 60%;
        height: 100%;
        transform: translateY(0);
        padding: 10px;
        &--date {
          .left {
            font-size: 12px;
          }
          .date {
            font-size: 12px;
          }
        }
      }
    }
  }
`;
