import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Context from "./context";
import "./i18n";
import "../public/lib/fontawesome/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import LanguageRedirectHandler from "./hooks/languageRedirectHandler";

AOS.init({
  duration: 800,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <LanguageRedirectHandler />
        <Root />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
