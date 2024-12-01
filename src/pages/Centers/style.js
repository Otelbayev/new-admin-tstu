import styled from "styled-components";

export const Content = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 45px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;
Content.Item = styled.div`
  border-radius: 10px;
  border: 1px solid var(--borderCart);
  cursor: pointer;
  height: 100%;
  transition: 0.5s;
  overflow: hidden;
`;
Content.Img = styled.img`
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
Content.Title = styled.div`
  color: #1c1c1c;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 10px;
`;

Content.P = styled.div`
  color: #585757;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding: 10px;
`;
