import styled from "styled-components";

export const Content = styled.div`
  padding: 50px 0 45px;
`;

Content.Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 25px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;
