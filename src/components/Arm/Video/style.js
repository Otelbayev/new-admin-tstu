import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ $reverse }) => $reverse && "row-reverse"};
  margin: 20px 0;
  align-items: center;
  gap: 20px;
  img {
    height: 350px;
  }
  .video-right {
    &__title {
      font-weight: 600;
      font-size: 24px;
      color: #11142d;
    }
    &__desc {
      padding: 15px 0;
      font-weight: 400;
      font-size: 18px;
      color: #515151;
    }
  }
`;
