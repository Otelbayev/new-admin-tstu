import styled from "styled-components";
import { Button, Input } from "../../components/Generics";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 45px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin: 50px 0 45px;
    gap: 20px;
  }
`;
export const Left = styled.div`
  width: 40%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
Left.Title = styled.div`
  color: var(--faq);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 25px;
  }
`;
Left.Desc = styled.div`
  color: #95a1bb;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding: 16px 0 29px;
  @media (max-width: 800px) {
    padding: 10px 0 18px;
    font-size: 14px;
  }
`;
Left.Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 800px) {
    gap: 10px;
  }
`;

Left.Div = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    gap: 10px;
  }
`;

export const Right = styled.div`
  width: 50%;
  iframe {
    border: none;
    width: 100%;
    height: 606px;
    border-radius: 8px;
    @media (max-width: 800px) {
      height: 400px;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Btn = styled(Button)`
  padding: 16px 32px;
  font-size: 14px;
  border-radius: 4px;
  width: 112px;
  @media (max-width: 800px) {
    padding: 10px 20px;
  }
`;

export const Inputs = styled(Input)``;
