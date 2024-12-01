import styled from "styled-components";
import user from "../../../assets/Faculties/user.svg?react";
import phone from "../../../assets/Faculties/phone.svg?react";
import email from "../../../assets/Faculties/email.svg?react";
import { Button } from "../../Generics";

export const Dekan = styled.div`
  display: flex;
  gap: 40px;
  padding: 50px 0;
  @media (max-width: 1000px) {
    padding: 30px 0;
  }
  @media (max-width: 776px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  @media (max-width: 500px) {
    padding: 0 10px;
  }
`;
Dekan.Left = styled.div`
  width: 35%;
  @media (max-width: 776px) {
    width: 100%;
  }
`;
Dekan.Right = styled.div`
  width: 65%;
  @media (max-width: 776px) {
    width: 100%;
  }
`;
Dekan.Img = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 22px;
  border: 1px solid #cecece;
  object-fit: cover;
  @media (max-width: 1000px) {
    height: 350px;
  }
  @media (max-width: 776px) {
    width: 300px;
  }
  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
  }
`;
Dekan.Name = styled.div`
  color: #1c1c1c;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px;
  margin-bottom: 18px;
  @media (max-width: 1000px) {
    font-size: 25px;
  }
`;
Dekan.Btn = styled(Button)`
  padding: 5px 25px;
  color: var(--white);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
`;
Dekan.Contact = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  div {
    color: #a6a6a6;
    font-family: "Inter";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    width: 200px;
    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }
`;
Dekan.Ul = styled.ul`
  margin: 16px 0;
  transform: translateX(10px);
`;
Dekan.Li = styled.li`
  color: #585757;
  font-family: "Inter";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
Dekan.User = styled(user)``;
Dekan.Phone = styled(phone)``;
Dekan.Email = styled(email)``;
