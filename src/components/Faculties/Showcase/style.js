import styled from "styled-components";
import { Button } from "../../../components/Generics";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 60px);
  background-image: ${({ $bg }) => `url(${$bg})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Content = styled.div`
  text-align: center;
`;
Content.Title = styled.div`
  color: var(--white);
  text-align: center;
  text-shadow: 0px 4px 46px rgba(0, 0, 0, 0.25);
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

Content.Btn = styled(Button)`
  padding: 8px 20px;
  font-family: "Inter";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: var(--white);
  margin-top: 40px;
  @media (max-width: 700px) {
    font-size: 16px;
    padding: 4px 10px;
    margin-top: 20px;
  }
`;
