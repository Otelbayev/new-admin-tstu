import styled from "styled-components";
import arrow from "../../../assets/Faculties/yonlaishlar.svg?react";

export const Content = styled.div``;
Content.Wrap = styled.div`
  display: flex;
  align-items: center;
`;
Content.Item = styled.div`
  cursor: pointer;
  margin: 5px 0;
  @media (max-width: 825px) {
    font-size: 14px;
  }
`;

export const Icon = styled(arrow)``;
