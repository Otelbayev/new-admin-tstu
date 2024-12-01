import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
`;

export const Rector = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
