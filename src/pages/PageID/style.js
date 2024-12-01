import { styled } from "styled-components";

export const Container = styled.div`
  .page-header {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    gap: 25px;
    img {
      width: 330px;
    }
    div {
      .line {
        height: 4px;
        width: 100%;
        display: block;
        background-color: var(--titleDark);
      }
      .page-title {
        padding: 15px 30px;
        font-size: 20px;
      }
    }
  }
  @media (max-width: 860px) {
    .page-header {
      flex-direction: column;
      div {
        .page-title {
          text-align: center;
        }
      }
    }
  }
`;
