import React from "react";
import styled from "styled-components";
import logo from "../../assets/icons/ffflogo.png";

const Div = styled.div`
  width: 100%;
  height: 100dvh;
  display: grid;
  place-items: center;
  background-color: var(--darkBg);
  img {
    width: 250px;
  }
`;
const Loading = () => {
  return (
    <Div>
      <img loading="lazy" src={logo} alt="" />
    </Div>
  );
};

export default Loading;
