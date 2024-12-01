import React, { useState } from "react";
import { Container, Content } from "../Footer/style";
import logo1 from "../../../assets/ARM/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = ({
  mainRef,
  bazaRef,
  armRef,
  collectRef,
  newsRef,
  aloqaRef,
}) => {
  const naviagte = useNavigate();
  const width = window.innerWidth;
  const { i18n } = useTranslation();
  return (
    <Container>
      <div className="root-container" style={{ position: "relative" }}>
        <div className="root-wrapper">
          <Content type={"header"} data-aos="fade-down">
            {width <= 1000 && <Content.Menu />}
            <Content.Logo loading="lazy" src={logo1} />
            <Content.Right>
              {width > 1000 && (
                <div>
                  <Content.Link
                    onClick={() =>
                      mainRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    Asosiy
                  </Content.Link>
                  <Content.Link
                    onClick={() =>
                      bazaRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    Elektron baza
                  </Content.Link>
                  <Content.Link
                    onClick={() =>
                      armRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    ARM
                  </Content.Link>
                  <Content.Link
                    onClick={() =>
                      collectRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    Kolleksiya
                  </Content.Link>
                  <Content.Link
                    onClick={() =>
                      newsRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    Yangiliklar
                  </Content.Link>
                  <Content.Link
                    onClick={() =>
                      aloqaRef.current.scrollIntoView({ block: "nearest" })
                    }
                  >
                    Aloqa
                  </Content.Link>
                </div>
              )}
              <Content.Btn
                type="primary"
                onClick={() => naviagte(`${i18n.language}/signin`)}
              >
                Sign In
              </Content.Btn>
            </Content.Right>
          </Content>
        </div>
      </div>
    </Container>
  );
};

export default Header;
