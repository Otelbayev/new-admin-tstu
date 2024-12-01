import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Min = styled.div`
  min-height: calc(100dvh - 500px);
`;

const Universal = () => {
  return (
    <div>
      <Header uni={true} />
      <Min>
        <Outlet />
      </Min>
      <Footer />
    </div>
  );
};

export default Universal;
