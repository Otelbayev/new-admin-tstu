import React from "react";
import none from "../../../assets/images/404.png";
import { Container, Img, Wrapper, Status, Desc, Wrap } from "./style";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Generics";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (
    <Container data-aos="zoom-in">
      <Wrapper>
        <Img loading="lazy" src={none} />
        <Wrap>
          <Status>404</Status>
          <Desc>sahifa topilmadi</Desc>
          <Button
            type={"primary"}
            onClick={() => navigate(`/${i18n.language}/`)}
            $padding={"13px 15px"}
            fontSize={"14px"}
          >
            Asosiyga qaytish
          </Button>
        </Wrap>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
