import React, { useEffect } from "react";
import { Content } from "./style";
import { Collapse } from "antd";
import { Helmet } from "react-helmet";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const styl = {
    fontFamily: "Rubik",
    color: "#95A1BB",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "22px",
    padding: 0,
    margin: 0,
  };
  const styls = {
    fontFamily: "Rubik",
    color: "#363940",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "22px",
  };
  const items = [
    {
      key: "1",
      label: <p style={styls}>Cursus at est venenatis in.</p>,
      children: (
        <p style={styl}>Posuere amet vel egestas malesuada vel odio neque.</p>
      ),
    },
    {
      key: "2",
      label: (
        <p style={styls}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      ),
      children: (
        <p style={styl}>Posuere amet vel egestas malesuada vel odio neque.</p>
      ),
    },
    {
      key: "3",
      label: <p style={styls}>Quam nunc dolor varius.</p>,
      children: (
        <p style={styl}>Posuere amet vel egestas malesuada vel odio neque.</p>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <div className="title">FAQ</div>
            <div className="content">
              <div className="content__left">
                <Collapse ghost items={items} />
              </div>
              <div className="content__right">
                <div className="content__right__title">
                  Lorem Lorem Lorem Lorem Lorem Lorem
                </div>
                <div className="content__right__p">
                  Lorem imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsunLorem imsunLorem imsunLorem
                  imsunLorem imsunLorem imsun
                </div>
              </div>
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Faq;
