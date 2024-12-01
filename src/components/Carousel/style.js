import { Carousel } from "antd";
import styled from "styled-components";

export const Container = styled(Carousel)`
  height: 400px;
`;

Container.Item = styled.img`
  height: 400px;
  border-radius: 10px;
  border: 1px solid #0868a2;
`;

export const Arrow = styled.img`
  position: absolute;
  z-index: 1;
  top: 50%;
  right: ${({ $right }) => $right && "5px"};
  left: ${({ $left }) => $left && "5px"};
  transform: translateY(-50%)
    rotate(${({ $right }) => ($right ? "0" : "180deg")});
  cursor: pointer;
  width: 45px;
  height: 45px;
`;
