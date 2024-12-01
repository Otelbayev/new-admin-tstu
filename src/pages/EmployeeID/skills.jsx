import React from "react";

const Skills = ({ data ,t}) => {
  return (
    <div className="container bg-white py-5">
      <div className="row px-3">
        <div className="col-12">
          <h2 className="title position-relative pb-2 mb-4">
            {t("employee.lang")}
          </h2>
        </div>
        <div className="col-sm-6">
          <div className="skill mb-4">
            <div className="d-flex justify-content-between">
              <p className="mb-2 langu">{t("employee.uz")}</p>
              <p className="mb-2 langu">{data?.languages_uz}%</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${data?.languages_uz}%` }}
                aria-valuenow={data?.languages_uz}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="skill mb-4">
            <div className="d-flex justify-content-between">
              <p className="mb-2 langu">{t("employee.ru")}</p>
              <p className="mb-2 langu">{data?.languages_ru}%</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                aria-valuenow={data?.languages_ru}
                style={{ width: `${data?.languages_ru}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="skill mb-4">
            <div className="d-flex justify-content-between">
              <p className="mb-2 langu">{t("employee.en")}</p>
              <p className="mb-2 langu">{data?.languages_en}%</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                aria-valuenow={data?.languages_en}
                style={{ width: `${data?.languages_en}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          {data?.languages_any && (
            <div className="skill mb-4">
              <div className="d-flex justify-content-between">
                <p className="mb-2 langu">{data?.languages_any_title}</p>
                <p className="mb-2 langu">{data?.languages_any}%</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  aria-valuenow={data?.languages_any}
                  style={{ width: `${data?.languages_any}%` }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
