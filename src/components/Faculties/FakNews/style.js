import styled from "styled-components";

export const Content = styled.div`
  border: 1px solid var(--borderCart);
  border-radius: 8px;
  direction: ltr;
  margin-left: 10px;
`;

Content.Img = styled.img`
  width: 100%;
  height: 50%;
`;
Content.UserDate = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  div {
    display: flex;
    align-items: center;
    gap: 3px;

    span {
      color: #34314f;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }
`;
Content.Title = styled.div`
  color: #1b192a;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
Content.Desc = styled.div`
  color: #34314f;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

Content.Wrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
