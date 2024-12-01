import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px 0;
  @media screen and (max-width: 996px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 20px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 15px;
  }
`;
