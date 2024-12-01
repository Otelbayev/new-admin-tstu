import { Rate } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRate } from "../../hooks/useRate";
import Image from "../../components/Image";

const DepartmentCart = ({ title, score, id, icon, img, kafedra }) => {
  const navigate = useNavigate();
  const rate = useRate(score);
  return (
    <Container
      $bg={kafedra && `${import.meta.env.VITE_BASE_URL_IMG}${img}`}
      onClick={() => navigate(`${id}`)}
      data-aos="zoom-in"
    >
      <div className="rating-cart">
        {!kafedra && (
          <Image
            src={`${import.meta.env.VITE_BASE_URL_IMG}/${icon}`}
            className="rating-cart__icon"
            alt="logo icon"
          />
        )}
        <div className="rating-cart__title">{title}</div>
        <Rate disabled defaultValue={rate} className="rating-cart__rate" />
        <div className="rating-cart__score">{score.toFixed(1)} ball</div>
      </div>
    </Container>
  );
};

export default DepartmentCart;

const Container = styled.div`
  border: 1px solid #a0a0a0;
  border-radius: 6px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  cursor: pointer;
  color: #000;
  .rating-cart {
    text-align: center;
    border-radius: 6px;
    &__icon {
      width: 100px;
    }
    &__title {
      font-size: 24px;
      font-weight: 700;
      color: inherit;
      margin: 20px 0;
    }
    &__score {
      font-size: 25px;
      font-weight: 400;
      color: inherit;
      padding-top: 15px;
    }
  }
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
    box-shadow: 0 0 10px #acacac;
    .rating-cart__rate {
      transform: scale(1.5);
      transition: 0.5s ease-in-out;
      .ant-rate-star {
        animation: rotateStar 0.5s ease-in-out;
      }
    }
  }
  ${({ $bg }) =>
    $bg &&
    `
      position: relative;
      border-radius: 6px;
      background-image: url(${$bg});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      color: #fff;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
      }
      .rating-cart {
        z-index: 1;
    .ant-rate-star-zero .ant-rate-star-second {
          color:rgba(255,255,255,0.5);
        }
      }
    `}

  @keyframes rotateStar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
