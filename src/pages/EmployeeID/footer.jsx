import React from "react";

const Footer = ({ t }) => {
  return (
    <div className="container-fluid px-0">
      <div className="container bg-dark text-light text-center py-5">
        {/* <div className="d-flex justify-content-center mb-4">
        <a className="btn btn-outline-primary btn-square mr-2" href="#">
          <i className="fab fa-twitter" />
        </a>
        <a className="btn btn-outline-primary btn-square mr-2" href="#">
          <i className="fab fa-facebook-f" />
        </a>
        <a className="btn btn-outline-primary btn-square mr-2" href="#">
          <i className="fab fa-linkedin-in" />
        </a>
        <a className="btn btn-outline-primary btn-square" href="#">
          <i className="fab fa-instagram" />
        </a>
      </div> */}
        <p className="m-0 no-data">
          <a href="https://tstu.uz/" target="_blank" rel="noopener noreferrer">
            TSTU.UZ
          </a>
          {"  "}
          {t("employee.bottom")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
