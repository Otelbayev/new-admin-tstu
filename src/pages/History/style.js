import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;
  p {
    font-size: 16px;
    color: #4c4c4c;
    line-height: 25px;
    text-indent: 10px;
  }
  .centered-img {
    text-align: center;
    img {
      width: 50%;
    }
  }
  .three-img {
    display: flex;
    justify-content: space-between;
    img {
      width: 30%;
    }
  }

  .card img {
    height: auto;
  }

  @media screen and (max-width: 800px) {
    .centered-img {
      img {
        width: 80%;
      }
    }
    .three-img {
      flex-direction: column;
      align-items: center;
      img {
        width: 80%;
      }
    }
  }
`;
