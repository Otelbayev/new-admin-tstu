import styled from "styled-components";
import f from "../../../assets/Faculties/facebook.svg?react";
import w from "../../../assets/Faculties/whatsapp.svg?react";
import i from "../../../assets/Faculties/instagram.svg?react";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 11px;
  @media (max-width: 800px) {
    gap: 7px;
  }
`;

Content.Img = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #cecece;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 800px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`;
Content.Name = styled.div`
  cursor: pointer;
  color: #1b192a;
  text-align: center;
  font-size: 22px;
  width: 80%;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;
Content.Position = styled.div`
  color: #34314f;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
Content.Media = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    gap: 10px;
  }
`;

Content.Facebook = styled(f)`
  @media (max-width: 800px) {
    width: 25px;
    height: 25px;
  }
`;
Content.Whatsup = styled(w)`
  @media (max-width: 800px) {
    width: 25px;
    height: 25px;
  }
`;
Content.Instagram = styled(i)`
  @media (max-width: 800px) {
    width: 25px;
    height: 25px;
  }
`;
