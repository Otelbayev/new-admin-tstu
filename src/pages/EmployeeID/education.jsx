import React from "react";

const Education = ({ data ,t}) => {
  return (
    <div className="container bg-white py-5">
      <div className="row px-3">
        <div className="col-12">
          <h2 className="title position-relative pb-2 mb-4">
            {t("employee.ex")}
          </h2>
        </div>
        <div className="col-12">
          <div
            className="border-left border-primary pt-2 pl-4 ml-2"
            dangerouslySetInnerHTML={{
              __html: data?.experience_json
                ? data?.experience_json
                : "<p class='no-data'>Ma'lumotlar yo'q</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
