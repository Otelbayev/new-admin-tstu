import styled from "styled-components";

export const Container = styled.div`
  margin: 50px 0;
  .slider {
    margin-top: 20px;
    padding: 10px 0;
    &__item {
      border-radius: 5px;
      padding: 0 10px;
    }
  }
  @media (max-width: 900px) {
    .slider {
      &__item {
        padding: 0 5px;
      }
    }
  }
`;