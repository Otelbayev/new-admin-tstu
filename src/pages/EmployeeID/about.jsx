import React from "react";

const About = ({ data, t }) => {
  console.log(data);
  return (
    <div className="container bg-white py-5">
      <div className="row px-3">
        <div className="col-12">
          <h2 className="title position-relative pb-2 mb-4">
            {t("employee.bio")}
          </h2>
        </div>
        <div className="col-12">
          <p
            className="bio"
            dangerouslySetInnerHTML={{
              __html: data?.biography_json,
              // ? data?.biography_json
              // : "<p class='no-data'>Ma'lumotlar yo'q</p>",
            }}
          />
          <div className="row">
            <div className="col-sm-6 py-1">
              <h5>
                <span className="text-primary mr-2">{t("employee.fio")}:</span>
                {data?.persons_?.firstName ||
                  data?.persons_translation_?.firstName}{" "}
                {data?.persons_?.lastName ||
                  data?.persons_translation_?.lastName}{" "}
                {data?.persons_?.fathers_name ||
                  data?.persons_translation_?.fathers_name}
              </h5>
            </div>
            {data?.birthday && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">
                    {t("employee.birth")}:
                  </span>
                  {data?.birthday?.split("T")[0]}
                </h5>
              </div>
            )}
            {data?.degree && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">
                    {t("employee.deg")}:
                  </span>
                  {data?.degree} {data?.scientific_title}
                </h5>
              </div>
            )}
            {data?.expericence_year && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">{t("employee.ex")}:</span>
                  {data?.expericence_year}
                </h5>
              </div>
            )}
            {data?.phone_number1 && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">
                    {t("employee.tel")}:
                  </span>
                  {data?.phone_number1}
                </h5>
              </div>
            )}
            {(data?.persons_?.email ||
              data?.persons_translation_?.persons_?.email) && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">Email:</span>
                  {data?.persons_?.email ||
                    data?.persons_translation_?.persons_?.email}
                </h5>
              </div>
            )}
            {data?.orchid && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">ORCID:</span>
                  {data?.orchid}
                </h5>
              </div>
            )}
            {data?.scopus_id && (
              <div className="col-sm-6 py-1">
                <h5>
                  <span className="text-primary mr-2">Scopus ID:</span>

                  {data?.scopus_id}
                </h5>
              </div>
            )}
            {data?.address && (
              <div className="col-sm-12 py-1">
                <h5>
                  <span className="text-primary mr-2">
                    {t("employee.address")}:
                  </span>
                  {data?.address}
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
