import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #0f347f33;
  border-radius: 6px;
  display: flex;
  img {
    height: 100%;
    width: 50%;
  }
  .audio-right {
    width: 50%;
    padding: 20px;
    &__title {
      color: #0f1121;
      font-size: 24px;
      font-weight: 600;
    }
    &__desc {
      color: #6f707a;
      font-size: 16px;
      font-weight: 400;
      padding-top: 10px;
    }
  }
`;
