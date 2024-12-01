import styled from "styled-components";

export const Content = styled.div`
  padding: 50px 0 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 9px;
  row-gap: 5px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 840px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 776px) {
    padding: 30px 15px;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
