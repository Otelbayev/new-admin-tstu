import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  position: absolute;
  z-index: 2;
  background: #fff;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  padding: 50px 80px;
  border-radius: 10px;
  top: -100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 800px) {
    padding: 40px;
    top: -50px;
  }
  @media (max-width: 700px) {
    padding: 20px 30px;
  }
`;
Container.Item = styled.div`
  text-align: center;
`;
Container.Count = styled.div`
  font-size: 50px;
  font-weight: 600;
  color: #004b85;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;
Container.Sub = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #004b85;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;
