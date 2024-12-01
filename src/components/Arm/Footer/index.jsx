import React from "react";
import { Container, Content } from "./style";
import logo from "../../../assets/ARM/logo.png";

const Footer = () => {
  return (
    <Container>
      <div className="root-container">
        <div className="root-wrapper">
          <Content>
            <Content.Logo loading="lazy" src={logo} />
            <Content.Link to="/">Asosiy</Content.Link>
            <Content.Link to="/">Elektron baza</Content.Link>
            <Content.Link to="/arm">ARM</Content.Link>
            <Content.Link to="/">Kolleksiya</Content.Link>
            <Content.Link to="/news">Yangiliklar</Content.Link>
            <Content.Link to="/contact">Aloqa</Content.Link>
          </Content>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
