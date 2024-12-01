import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

export const Wrapper = styled.div`
  width: 773px;
  height: 628px;
  position: relative;
  @media (max-width: 700px) {
    width: 500px;
    height: 400px;
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  @media (max-width: 700px) {
    gap: 10px;
  }
`;

export const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Status = styled.div`
  color: var(--statusColor);
  font-size: 178.942px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 200px;
  @media (max-width: 700px) {
    font-size: 60px;
    height: 60px;
  }
`;
export const Desc = styled.div`
  font-size: 30px;
  color: var(--statusColor);
  font-weight: 600;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`;
