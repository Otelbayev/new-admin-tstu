import styled from "styled-components";

export const Container = styled.div`
  height: 500px;
  perspective: 1000px;
  &:hover .content {
    transform: rotateY(180deg);
  }
  @media (max-width: 500px) {
    height: 390px;
  }

  @media (max-width: 700px) {
    height: 530px;
    &:hover .content {
      transform: rotateY(0);
    }
  }
`;

export const Content = styled.div`
  width: 350px;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  .position {
    color: var(--date);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    padding: 10px;
  }
  .name {
    color: var(--titleDark);
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    padding: 5px 0;
    padding: 0 20px 10px;
  }
  .bat-btn {
    text-align: center;
    display: none;
    a {
      font-size: 14px;
    }
  }
  @media (max-width: 700px) {
    .bat-btn {
      display: block;
    }
  }
  @media (max-width: 500px) {
    width: 350px;
    .position {
      font-size: 14px;
    }
    .name {
      font-size: 18px;
    }
  }
  @media (max-width: 400px) {
    width: 300px;
  }
`;

Content.Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 9px;
  border: 1px solid #cecece;
  img {
    width: 100%;
    height: 70%;
    border-radius: 9px;
  }
  @media (max-width: 700px) {
    img {
      height: 65%;
    }
  }
`;

Content.Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 30px;
  border-radius: 9px;
  border: 1px solid #007aff;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  text-align: center;
  img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
  }
  .desc {
    color: var(--date);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .wrap {
    display: flex;
    align-items: center;
    text-align: start;
    /* justify-content: center; */
    margin: 0 auto;
    width: 80%;
    gap: 10px;
    padding: 5px;
    img {
      width: 40px;
      height: 40px;
    }
    .phone {
      color: var(--date);
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 160% */
    }
  }

  @media (max-width: 500px) {
    padding: 20px;
    img {
      width: 100px;
      height: 100px;
    }
    .wrap {
      margin: 10px;
      img {
        width: 30px;
        height: 30px;
      }
      .phone {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 400px) {
    padding: 10px;
    .wrap {
      margin: 5px;
    }
  }
`;
