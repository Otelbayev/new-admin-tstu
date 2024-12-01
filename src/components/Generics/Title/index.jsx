import React from "react";
import { Content, Light, Component } from "./style";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Title = React.forwardRef(
  (
    { children, title, subtitle, button, $type, $border, component, to, link },
    ref
  ) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    return (
      <div ref={ref}>
        <Content>
          {title && (
            <Content.Title
              data-aos="fade-right"
              $type={$type}
              $border={$border}
            >
              {title}
            </Content.Title>
          )}
          {button && (
            <Content.Button
              onClick={() =>
                link
                  ? (window.location.href = link)
                  : navigate(`/${i18n.language}/${to}`)
              }
              data-aos="fade-left"
              $type={$type}
              display="top"
            >
              {button}
              <div className="abs"></div>
            </Content.Button>
          )}
          {component && <Component display="top">{component}</Component>}
        </Content>
        {subtitle && (
          <Content.SubTitle data-aos="fade-right" $type={$type}>
            {subtitle}
          </Content.SubTitle>
        )}
        {children}
        {button && (
          <Content.Button
            onClick={() => navigate(`/${i18n.language}/${to}`)}
            data-aos="fade-left"
            display="bottom"
            $type={$type}
          >
            {button}
            <div className="abs"></div>
          </Content.Button>
        )}
        {component && <Component display="bottom">{component}</Component>}
      </div>
    );
  }
);

export default Title;
