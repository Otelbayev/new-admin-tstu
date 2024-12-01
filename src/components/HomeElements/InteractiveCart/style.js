import styled from "styled-components";
import darkArrow from "../../../assets/icons/arrow-dark.svg?react";

export const Wrap = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 30px;
  border: 1px solid #cecece;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  background: #ffff;
  img {
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 3px;
  }
  .title {
    color: var(--titleDark);
    text-decoration: none;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 119%;
    margin-top: 20px;
    i {
      font-size: 20px;
    }
  }
  @media (max-width: 650px) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 15px;
    .title {
      font-size: 20px;
      width: 50%;
    }
  }
`;

export const Icon = styled(darkArrow)`
  width: 20px;
  height: 20px;
  transform: translateY(4px);
`;
