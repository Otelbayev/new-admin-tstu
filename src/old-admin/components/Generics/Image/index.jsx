import React from "react";

const Image = ({ label, className, img, alt }) => {
  return (
    <div className={className}>
      <label htmlFor="img" className="col-sm-12 col-form-label">
        {label}
      </label>
      <div className="col-sm-12">
        <img
          loading="lazy"
          style={{ width: "100%" }}
          src={img}
          alt={alt || "Img"}
        />
      </div>
    </div>
  );
};

export default Image;
